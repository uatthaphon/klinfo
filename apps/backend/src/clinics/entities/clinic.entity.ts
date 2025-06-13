import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ClinicMember } from '../../clinic-members/entities/clinic-member.entity'
import { ServiceEntity } from '../../services/entities/service.entity'

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ nullable: true })
  timezone?: string

  @Column({ nullable: true })
  language?: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  city?: string

  @Column({ nullable: true })
  state?: string

  @Column({ nullable: true })
  zip?: string

  @Column({ nullable: true })
  email?: string

  @Column({ nullable: true })
  website?: string

  @Column({ nullable: true })
  googleMap?: string

  @OneToMany(() => ClinicMember, clinicMember => clinicMember.clinic)
  members: ClinicMember[]

  @OneToMany(() => ServiceEntity, service => service.clinic, {
    cascade: true,
  })
  services: ServiceEntity[]
}
