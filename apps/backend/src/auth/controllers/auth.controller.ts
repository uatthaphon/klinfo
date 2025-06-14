import { Body, Controller, Post, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignupDto } from '../dto/signup.dto';
import { RequestPasswordDto } from '../dto/request-password.dto';
import { VerifyEmailDto } from '../dto/verify-email.dto';
import { RequestVerificationDto } from '../dto/request-verification.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('request-password-reset')
  requestReset(@Body() dto: RequestPasswordDto) {
    return this.authService.requestPasswordReset(dto);
  }

  @Post('verify-email')
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.email, dto.token);
  }


  @Post('resend-verification')
  resendVerification(@Body() dto: RequestVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: any) {
    return this.authService.getProfile(req.user.id);
  }
}
