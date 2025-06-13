import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { Role } from '../../auth/constants/role.enum';
import { CreateClinicDto } from '../../clinics/dto/create-clinic.dto';

export class OnboardingMemberDto {
  @IsOptional()
  userId?: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class OnboardingServiceDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  price?: number;
}

export class CreateOnboardingDto {
  @ValidateNested()
  @Type(() => CreateClinicDto)
  clinicInfo: CreateClinicDto;

  @ValidateNested()
  @Type(() => OnboardingMemberDto)
  @IsOptional()
  firstMember?: OnboardingMemberDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OnboardingServiceDto)
  services: OnboardingServiceDto[];
}
