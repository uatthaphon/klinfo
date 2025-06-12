

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClinicMember } from './clinic-member.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ClinicMember, member => member.clinic)
  members: ClinicMember[];
}