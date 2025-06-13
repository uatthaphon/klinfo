import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicMember } from './entities/clinic-member.entity';
import { Role } from '../auth/constants/role.enum';
import { Clinic } from '../clinics/entities/clinic.entity';

@Injectable()
export class ClinicMembersService {
  constructor(
    @InjectRepository(ClinicMember)
    private readonly clinicMemberRepo: Repository<ClinicMember>,
  ) {}

  async addMember(
    clinic: Clinic,
    userId: string,
    role: Role,
  ): Promise<ClinicMember> {
    const clinicMember = this.clinicMemberRepo.create({
      clinic,
      user: { id: userId } as any,
      role,
    });
    return this.clinicMemberRepo.save(clinicMember);
  }
}
