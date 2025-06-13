import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ClinicMember } from '../../clinic-members/entities/clinic-member.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({ default: false })
  isEmailVerified: boolean

  @OneToMany(() => ClinicMember, clinicMember => clinicMember.user)
  clinicMemberships: ClinicMember[]
}
