import { Module } from '@nestjs/common';
import { ClinicsModule } from '../clinics/clinics.module';
import { ClinicMembersModule } from '../clinic-members/clinic-members.module';
import { ServiceModule } from '../services/service.module';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';

@Module({
  imports: [ClinicsModule, ClinicMembersModule, ServiceModule],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
