import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Clinic } from './entities/clinic.entity'
import { ClinicMember } from './entities/clinic-member.entity'
import { ClinicsService } from './clinics.service'
import { ClinicsController } from './clinics.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, ClinicMember])],
  providers: [ClinicsService],
  controllers: [ClinicsController],
  exports: [ClinicsService],
})
export class ClinicsModule {}
