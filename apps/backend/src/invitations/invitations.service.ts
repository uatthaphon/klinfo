import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepo: Repository<Invitation>,
  ) {}

  findValidToken(token: string) {
    return this.invitationRepo.findOne({
      where: { token, isAccepted: false },
      relations: ['clinic'],
    });
  }

  markAccepted(invite: Invitation) {
    invite.isAccepted = true;
    return this.invitationRepo.save(invite);
  }
}
