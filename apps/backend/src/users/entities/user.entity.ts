

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClinicMember } from '../../clinics/entities/clinic-member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => ClinicMember, member => member.user)
  clinicMemberships: ClinicMember[];
}