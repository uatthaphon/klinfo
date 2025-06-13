import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClinicDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  timezone?: string

  @IsOptional()
  language?: string

  @IsOptional()
  phone?: string

  @IsOptional()
  city?: string

  @IsOptional()
  state?: string

  @IsOptional()
  zip?: string

  @IsOptional()
  email?: string

  @IsOptional()
  website?: string

  @IsOptional()
  googleMap?: string

}
