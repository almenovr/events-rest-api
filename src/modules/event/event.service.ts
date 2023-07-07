import { Injectable } from '@nestjs/common';
import { EventEntity } from '../../data-base/entites/event.entity';
import { EventRequestDto } from '../../data-base/dto/event-request.dto';
import { DataSource } from 'typeorm';
import { VenueEntity } from '../../data-base/entites/venue.entity';
import { QueryDto } from '../../data-base/dto/query.dto';
import { DatePeriodEventEntity } from '../../data-base/entites/date-period-event.entity';

@Injectable()
export class EventService {
  constructor(private dataSource: DataSource) {}

  async getList(query: QueryDto): Promise<EventEntity[]> {
    let columnOrderBy: string;
    let valueOrderBy: any;
    let where = '';
    if (query.sort) {
      columnOrderBy = query.sort[0];
      valueOrderBy = query.sort[1];
    }
    if (query.filter) {
      const availableColumns: string[] = ['id', 'start_date'];
      for (const availableColumn of availableColumns) {
        if (query.filter.hasOwnProperty(availableColumn)) {
          if (typeof query.filter[availableColumn] === 'object') {
            where = `event.${availableColumn} = ${query.filter[
              availableColumn
            ].join(` or event.${availableColumn} = `)}`;
          }
          if (query.filter.hasOwnProperty('start_date'))
            where == ''
              ? (where = `dpee.test = ${query.filter['start_date']}`)
              : (where += ` and  start_date = ${query.filter['start_date']}`);
          console.log(where);
        }
      }
    }
    return await this.dataSource
      .createQueryBuilder()
      .select('event')
      .from(EventEntity, 'event')
      .innerJoin(DatePeriodEventEntity, 'dpee', 'dpee.event_id=event.id')
      .where(where)
      .orderBy(columnOrderBy, valueOrderBy)
      .getMany();
  }
  async getOne(eventId: number) {
    return await EventEntity.findOneBy({
      id: eventId,
    });
  }

  async createEvent(eventDto: EventRequestDto): Promise<EventEntity> {
    const entity = new EventEntity();
    entity.name = eventDto.name;
    entity.description = eventDto.description;
    entity.thumbnail = eventDto.thumbnail;
    entity.status = eventDto.status;
    await entity.save();
    if (entity) {
      for (const period of eventDto.periodDate) {
        console.log(period);
        const periodDateEntity = new DatePeriodEventEntity();
        periodDateEntity.startDate = new Date(period.startDate);
        periodDateEntity.endDate = new Date(period.endDate);
        periodDateEntity.eventId = entity.id;
        await periodDateEntity.save();
      }
      const venueEntity = new VenueEntity();
      venueEntity.name = eventDto.venue.name;
      venueEntity.country = eventDto.venue.country;
      venueEntity.state = eventDto.venue.state;
      venueEntity.city = eventDto.venue.city;
      venueEntity.timezone = eventDto.venue.timezone;
      venueEntity.zipCode = eventDto.venue.zip_code;
      venueEntity.address = eventDto.venue.address;
      venueEntity.eventId = entity.id;
      await venueEntity.save();
    }
    return entity;
  }

  async updateEvent(
    eventId: number,
    eventDto: EventRequestDto,
  ): Promise<EventEntity> {
    const entity = await new EventEntity();
    entity.id = eventId;
    entity.name = eventDto.name;
    entity.description = eventDto.description;
    entity.thumbnail = eventDto.thumbnail;
    entity.status = eventDto.status;
    await entity.save();
    if (entity) {
      for (const period of eventDto.periodDate) {
        const periodDateEntity = new DatePeriodEventEntity();
        periodDateEntity.startDate = new Date(period.startDate);
        periodDateEntity.endDate = new Date(period.endDate);
        periodDateEntity.eventId = eventId;
        await periodDateEntity.save();
      }
      const venueEntity = new VenueEntity();
      venueEntity.name = eventDto.venue.name;
      venueEntity.country = eventDto.venue.country;
      venueEntity.state = eventDto.venue.state;
      venueEntity.city = eventDto.venue.city;
      venueEntity.timezone = eventDto.venue.timezone;
      venueEntity.zipCode = eventDto.venue.zip_code;
      venueEntity.address = eventDto.venue.address;
      venueEntity.eventId = eventId;
      await venueEntity.save();
    }
    await entity.save();
    return entity;
  }

  async deleteEvent(eventId): Promise<EventEntity> {
    const entity = await EventEntity.findOneBy({
      id: eventId,
    });
    await EventEntity.delete({
      id: eventId,
    });
    return entity;
  }
}
