import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../enum/status.enum';
import { VenueEntity } from './venue.entity';
import { DatePeriodEventEntity } from './date-period-event.entity';

@Entity()
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_on' })
  createdOn: Date;

  @UpdateDateColumn({ name: 'modified_on' })
  modifiedOn: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => VenueEntity, (venue) => venue.event, {
    eager: true,
    nullable: true,
    onDelete: 'CASCADE',
  })
  venues: VenueEntity[];

  @Column({ nullable: true })
  thumbnail: string;

  @OneToMany(
    () => DatePeriodEventEntity,
    (datePeriodEvent) => datePeriodEvent.event,
    {
      eager: true,
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  datePeriod: DatePeriodEventEntity[];

  @Column({ type: 'enum', enum: StatusEnum, nullable: true })
  status: StatusEnum;
}
