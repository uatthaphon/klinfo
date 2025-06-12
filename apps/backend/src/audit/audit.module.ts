import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditProcessor } from './audit.processor';
import { AuditLog } from './entities/audit-log.entity';
import { AuditService } from './services/audit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditLog]),
    BullModule.registerQueue({ name: 'audit' }),
  ],
  providers: [AuditService, AuditProcessor],
})
export class AuditModule {}
