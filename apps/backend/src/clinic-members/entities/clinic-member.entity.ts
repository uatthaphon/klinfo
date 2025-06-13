import { Role } from 'src/auth/constants/role.enum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Clinic } from '../../clinics/entities/clinic.entity';

@Entity({ name: 'clinic_members' })
export class ClinicMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.clinicMemberships, { eager: true })
  user: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.members, { eager: true })
  clinic: Clinic;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column('text', { array: true, nullable: true })
  permissions?: string[];

  @Column({ default: true })
  isActive: boolean;
}
