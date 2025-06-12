import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAuditLogDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsOptional()
  metadata?: Record<string, any>;
}
