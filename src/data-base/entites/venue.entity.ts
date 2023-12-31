import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity()
export class VenueEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ name: 'modified_on' })
  modifiedOn: Date;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  timezone: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  address: string;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.venues, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({
    name: 'event_id',
  })
  event: EventEntity;

  @RelationId((venue: VenueEntity) => venue.event)
  @Column({ name: 'event_id' })
  eventId: number;
}
