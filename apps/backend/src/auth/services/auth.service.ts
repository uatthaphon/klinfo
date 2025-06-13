import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMeta } from 'src/common/constants/response-codes';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { RequestPasswordDto } from '../dto/request-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignupDto } from '../dto/signup.dto';
import { comparePasswords, hashPassword } from '../utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signup(dto: SignupDto): Promise<any> {
    const existing = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException({
        success: false,
        ...ResponseMeta.Auth.EmailAlreadyRegistered,
        data: null,
      });
    }

    const hashedPassword = await hashPassword(dto.password);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const verifyToken = await this.jwtService.signAsync(
      { sub: user.id, purpose: 'verify' },
      { expiresIn: '1d' },
    );
    await this.mailService.sendEmailVerification(user.email, verifyToken);
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return {
      success: true,
      ...ResponseMeta.Auth.SignupSuccess,
      data: { accessToken },
    };
  }

  async login(dto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user || !(await comparePasswords(dto.password, user.password))) {
      throw new UnauthorizedException({
        success: false,
        ...ResponseMeta.Auth.InvalidCredentials,
        data: null,
      });
    }
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return {
      success: true,
      ...ResponseMeta.Auth.LoginSuccess,
      data: { accessToken },
    };
  }

  async requestPasswordReset(dto: RequestPasswordDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new BadRequestException({
        success: false,
        ...ResponseMeta.Auth.UserNotFound,
        data: null,
      });
    }
    const token = await this.jwtService.signAsync(
      { sub: user.id, purpose: 'reset' },
      { expiresIn: '1h' },
    );
    await this.mailService.sendPasswordReset(user.email, token);
    return {
      success: true,
      ...ResponseMeta.Auth.ResetEmailSent,
      data: null,
    };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException({
        success: false,
        ...ResponseMeta.Auth.InvalidResetToken,
        data: null,
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        purpose: string;
      }>(dto.token);
      if (payload.sub !== user.id || payload.purpose !== 'reset') {
        throw new Error('invalid');
      }
    } catch (e) {
      throw new UnauthorizedException({
        success: false,
        ...ResponseMeta.Auth.InvalidResetToken,
        data: null,
      });
    }

    user.password = await hashPassword(dto.newPassword);
    await this.userRepository.save(user);
    return {
      success: true,
      ...ResponseMeta.Auth.PasswordResetSuccess,
      data: null,
    };
  }

  async verifyEmail(email: string, token: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException({
        success: false,
        ...ResponseMeta.Auth.UserNotFound,
        data: null,
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string; purpose: string }>(token);
      if (payload.sub !== user.id || payload.purpose !== 'verify') {
        throw new Error('invalid');
      }
    } catch (e) {
      throw new UnauthorizedException({
        success: false,
        ...ResponseMeta.Auth.InvalidResetToken,
        data: null,
      });
    }
    user.isEmailVerified = true;
    await this.userRepository.save(user);
    return {
      success: true,
      ...ResponseMeta.Auth.EmailVerified,
      data: null,
    };
  }

  async resendVerification(email: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException({
        success: false,
        ...ResponseMeta.Auth.UserNotFound,
        data: null,
      });
    }
    if (user.isEmailVerified) {
      return {
        success: true,
        ...ResponseMeta.Auth.EmailVerified,
        data: null,
      };
    }
    const verifyToken = await this.jwtService.signAsync(
      { sub: user.id, purpose: 'verify' },
      { expiresIn: '1d' },
    );
    await this.mailService.sendEmailVerification(user.email, verifyToken);
    return {
      success: true,
      ...ResponseMeta.Auth.VerificationEmailSent,
      data: null,
    };
  }
}
