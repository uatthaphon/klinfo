import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  token: string;
}
