import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicMember } from './entities/clinic-member.entity';
import { ClinicMembersService } from './clinic-members.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicMember])],
  providers: [ClinicMembersService],
  exports: [ClinicMembersService],
})
export class ClinicMembersModule {}
