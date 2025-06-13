import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateClinicDto {
  @IsNotEmpty()
  name: string

  @IsOptional()
  timezone?: string

  @IsOptional()
  language?: string
}
