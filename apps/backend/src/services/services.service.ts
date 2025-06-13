import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from './entities/service.entity';
import { Clinic } from '../clinics/entities/clinic.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: Repository<ServiceEntity>,
  ) {}

  async createMany(clinic: Clinic, services: Partial<ServiceEntity>[]) {
    const data = services.map(s =>
      this.serviceRepo.create({ clinic, ...s }),
    );
    return this.serviceRepo.save(data);
  }
}
