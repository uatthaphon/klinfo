import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Role } from '../auth/constants/role.enum';
import { ClinicMember } from '../clinic-members/entities/clinic-member.entity';
import { ClinicsService } from '../clinics/clinics.service';
import { Clinic } from '../clinics/entities/clinic.entity';
import { ResponseMeta } from '../common/constants/response-codes';
import { ServiceEntity } from '../services/entities/service.entity';
import { ServicesService } from '../services/services.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';

@Injectable()
export class OnboardingService {
  constructor(
    private readonly clinicsService: ClinicsService,
    private readonly servicesService: ServicesService,
    private readonly dataSource: DataSource,
  ) {}

  async setupClinic(userId: string, dto: CreateOnboardingDto) {
    return this.dataSource.transaction(async (manager) => {
      const clinicRepo = manager.getRepository(Clinic);
      const clinicMemberRepo = manager.getRepository(ClinicMember);
      const serviceRepo = manager.getRepository(ServiceEntity);

      const clinic = clinicRepo.create(dto.clinicInfo);
      await clinicRepo.save(clinic);

      const owner = clinicMemberRepo.create({
        clinic: clinic,
        user: { id: userId } as any,
        role: Role.Owner,
      });
      await clinicMemberRepo.save(owner);

      if (dto.firstMember && dto.firstMember.userId) {
        if (dto.firstMember.role === Role.Owner) {
          throw new Error('Owner role cannot be assigned');
        }
        const firstMember = clinicMemberRepo.create({
          clinic: clinic,
          user: { id: dto.firstMember.userId } as any,
          role: dto.firstMember.role,
        });
        await clinicMemberRepo.save(firstMember);
      }

      if (dto.services?.length) {
        const serviceEntities = dto.services.map((s) =>
          serviceRepo.create({ clinic: clinic, ...s }),
        );
        await serviceRepo.save(serviceEntities);
      }

      return {
        success: true,
        ...ResponseMeta.Clinics.Created,
        data: clinic,
      };
    });
  }
}
