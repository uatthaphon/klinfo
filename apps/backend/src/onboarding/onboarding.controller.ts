import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VerifiedGuard } from '../auth/guards/verified.guard';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) {}

  @UseGuards(AuthGuard('jwt'), VerifiedGuard)
  @Post('setup')
  setup(@Req() req: any, @Body() dto: CreateOnboardingDto) {
    return this.onboardingService.setupClinic(req.user.id, dto);
  }
}
