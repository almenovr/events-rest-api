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

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
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

  @Column()
  zipCode: string;

  @Column()
  address: string;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.venues, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({
    name: 'eventId',
  })
  event: EventEntity;

  @RelationId((venue: VenueEntity) => venue.event)
  @Column({ name: 'eventId' })
  eventId: number;
}
