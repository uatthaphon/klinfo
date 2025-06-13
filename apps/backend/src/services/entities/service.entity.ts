import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clinic } from '../../clinics/entities/clinic.entity';

@Entity()
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  price: number;

  @ManyToOne(() => Clinic, clinic => clinic.services, { onDelete: 'CASCADE' })
  clinic: Clinic;
}
