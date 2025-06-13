import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ClinicsService } from './clinics.service'
import { CreateClinicDto } from './dto/create-clinic.dto'

@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req: any, @Body() dto: CreateClinicDto) {
    return this.clinicsService.createClinic(req.user.id, dto)
  }
}
