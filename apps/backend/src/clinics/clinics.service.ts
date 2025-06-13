import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Clinic } from './entities/clinic.entity'
import { ClinicMember } from './entities/clinic-member.entity'
import { Role } from '../auth/constants/role.enum'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { ResponseMeta } from '../common/constants/response-codes'

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic) private readonly clinicRepo: Repository<Clinic>,
    @InjectRepository(ClinicMember) private readonly memberRepo: Repository<ClinicMember>,
  ) {}

  async createClinic(userId: string, dto: CreateClinicDto): Promise<any> {
    const clinic = this.clinicRepo.create({
      name: dto.name,
      timezone: dto.timezone,
      language: dto.language,
    })
    await this.clinicRepo.save(clinic)
    const member = this.memberRepo.create({
      clinic,
      user: { id: userId } as any,
      role: Role.Owner,
    })
    await this.memberRepo.save(member)
    return {
      success: true,
      ...ResponseMeta.Clinics.Created,
      data: clinic,
    }
  }
}
