import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { EventEntity } from '../data-base/entites/event.entity';
import { VenueEntity } from '../data-base/entites/venue.entity';
import { DatePeriodEventEntity } from '../data-base/entites/date-period-event.entity';

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  host: process.env.TYPEORM_HOST,
  port: 5468,
  logging: false,
  entities: [EventEntity, VenueEntity, DatePeriodEventEntity],
  synchronize: true,
  autoLoadEntities: true,
};

export default ormConfig;
