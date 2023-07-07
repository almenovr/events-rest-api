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
export class DatePeriodEventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ name: 'modified_on' })
  modifiedOn: Date;

  @Column({ name: 'start_date', type: 'timestamp with time zone' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp with time zone' })
  endDate: Date;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.datePeriod, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  @JoinColumn({
    name: 'event_id',
  })
  event: EventEntity;

  @RelationId((datePeriodEvent: DatePeriodEventEntity) => datePeriodEvent.event)
  @Column({ name: 'event_id' })
  eventId: number;
}
