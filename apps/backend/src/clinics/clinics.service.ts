import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Clinic } from './entities/clinic.entity'
import { CreateClinicDto } from './dto/create-clinic.dto'
import { ResponseMeta } from '../common/constants/response-codes'

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic) private readonly clinicRepo: Repository<Clinic>,
    
  ) {}

  async createClinic(dto: CreateClinicDto): Promise<any> {
    const clinic = this.clinicRepo.create({
      name: dto.name,
      timezone: dto.timezone,
      language: dto.language,
      phone: dto.phone,
      city: dto.city,
      state: dto.state,
      zip: dto.zip,
      email: dto.email,
      website: dto.website,
      googleMap: dto.googleMap,
    })
    await this.clinicRepo.save(clinic)
    return {
      success: true,
      ...ResponseMeta.Clinics.Created,
      data: clinic,
    }
  }
}
