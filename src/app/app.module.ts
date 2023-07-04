import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from '../modules/event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../config/orm.config';
import { VenueModule } from '../modules/venue/venue.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), EventModule, VenueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
