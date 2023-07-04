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

@Entity()
export class EventEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
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

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column({ type: 'enum', enum: StatusEnum, nullable: true })
  status: StatusEnum;
}
