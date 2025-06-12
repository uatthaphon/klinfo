import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { CLINIC_MEMBER_KEY } from '../decorators/permissions.decorator';
import { ClinicMember } from 'src/clinics/entities/clinic-member.entity';

@Injectable()
export class ClinicMemberMiddleware implements NestMiddleware {
  constructor(private readonly dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const user = req.user as any;
    const clinicId = req.headers['x-clinic-id'] as string;

    if (!user || !clinicId) return next();

    const repo = this.dataSource.getRepository(ClinicMember);
    const member = await repo.findOne({
      where: {
        user: { id: user.id },
        clinic: { id: clinicId },
        isActive: true,
      },
      relations: ['user', 'clinic'],
    });

    if (member) {
      (req as any)[CLINIC_MEMBER_KEY] = member;
    }

    next();
  }
}
