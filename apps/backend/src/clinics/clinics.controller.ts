import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { VerifiedGuard } from '../auth/guards/verified.guard'
import { ClinicsService } from './clinics.service'
import { CreateClinicDto } from './dto/create-clinic.dto'

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @UseGuards(AuthGuard('jwt'), VerifiedGuard)
  @Post()
  create(@Body() dto: CreateClinicDto) {
    return this.clinicsService.createClinic(dto)
  }
}
