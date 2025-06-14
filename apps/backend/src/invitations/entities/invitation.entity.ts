import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Clinic } from '../../clinics/entities/clinic.entity';
import { Role } from '../../auth/constants/role.enum';

@Entity({ name: 'invitations' })
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ unique: true })
  token: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @ManyToOne(() => Clinic, { eager: true })
  clinic: Clinic;

  @Column({ default: false })
  isAccepted: boolean;
}
