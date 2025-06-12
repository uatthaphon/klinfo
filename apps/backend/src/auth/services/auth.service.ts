import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
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

  async signup(dto: SignupDto): Promise<{ accessToken: string }> {
    const hashedPassword = await hashPassword(dto.password);
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return { accessToken };
  }

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user || !(await comparePasswords(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    return { accessToken };
  }

  async resetPassword(dto: ResetPasswordDto): Promise<{ success: boolean }> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Invalid email or token');

    // Here you'd validate the token, omitted for now
    user.password = await hashPassword(dto.newPassword);
    await this.userRepository.save(user);
    return { success: true };
  }
}
