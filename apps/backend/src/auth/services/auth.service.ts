import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMeta } from 'src/common/constants/response-codes';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { SignupDto } from '../dto/signup.dto';
import { comparePasswords, hashPassword } from '../utils/password.util';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
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

    // Here you'd validate the token, omitted for now
    user.password = await hashPassword(dto.newPassword);
    await this.userRepository.save(user);
    return {
      success: true,
      ...ResponseMeta.Auth.PasswordResetSuccess,
      data: null,
    };
  }
}
