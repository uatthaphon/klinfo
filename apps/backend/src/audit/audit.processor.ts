import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Processor('audit')
export class AuditProcessor {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: Repository<AuditLog>,
  ) {}

  @Process()
  async handleLog(job: Job) {
    const { userId, action, metadata } = job.data;
    await this.auditLogRepo.save({ userId, action, metadata });
  }
}
