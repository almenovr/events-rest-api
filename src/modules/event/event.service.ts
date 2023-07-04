import { Injectable } from '@nestjs/common';
import { EventEntity } from '../../data-base/entites/event.entity';
import { EventRequestDto } from '../../data-base/dto/event-request.dto';
import { DataSource, Repository } from 'typeorm';
import { VenueEntity } from '../../data-base/entites/venue.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(EventEntity)
    private readonly eventEntityRepository: Repository<EventEntity>,
  ) {}

  async getList(query): Promise<EventEntity[]> {
    let columnOrderBy;
    let valueOrderBy;
    let where = '';
    if (query.sort) {
      columnOrderBy = query.sort[0];
      valueOrderBy = query.sort[1];
    }
    if (query.filter) {
      if (query.filter.id) where = 'id = ' + query.filter.id.join(' or id = ');
      if (query.filter.start_date) {
        if (where === '') {
          where = 'start_date = ' + query.filter.start_date;
        } else {
          where += ' and  start_date = ' + query.filter.start_date;
        }
      }
    }
    return await this.dataSource
      .createQueryBuilder()
      .select('event')
      .from(EventEntity, 'event')
      .where(where)
      .orderBy(columnOrderBy, valueOrderBy)
      .getMany();
  }
  async getOne(eventId: number) {
    return await EventEntity.findOneBy({
      id: eventId,
    });
  }

  async createEvent(eventDto: EventRequestDto) {
    const entity = await new EventEntity();
    entity.name = eventDto.name;
    entity.description = eventDto.description;
    entity.start_date = new Date(eventDto.start_date);
    entity.end_date = new Date(eventDto.end_date);
    entity.status = eventDto.status;
    entity.thumbnail = eventDto.thumbnail;
    await entity.save();
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

  async updateEvent(eventId, eventDto: EventRequestDto) {
    const entity = await new EventEntity();
    entity.id = eventId;
    entity.name = eventDto.name;
    entity.description = eventDto.description;
    entity.start_date = new Date(eventDto.start_date);
    entity.end_date = new Date(eventDto.end_date);
    entity.status = eventDto.status;
    entity.thumbnail = eventDto.thumbnail;
    await entity.save();
  }

  async deleteEvent(eventId) {
    await EventEntity.delete({
      id: eventId,
    });
  }
}
