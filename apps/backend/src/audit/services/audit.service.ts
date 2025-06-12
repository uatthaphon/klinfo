import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateAuditLogDto } from '../dto/create-audit-log.dto';

@Injectable()
export class AuditService {
  constructor(
    @InjectQueue('audit')
    private readonly auditQueue: Queue,
  ) {}

  async log(data: CreateAuditLogDto): Promise<void> {
    await this.auditQueue.add('log', data);
  }
}
