import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventRequestDto } from '../../data-base/dto/event-request.dto';
import { QueryDto } from '../../data-base/dto/query.dto';
import { EventEntity } from '../../data-base/entites/event.entity';
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getList(@Query() query: QueryDto) {
    return this.eventService.getList(query);
  }

  @Get('/:eventId')
  async getOne(@Param('eventId') eventId: number) {
    return this.eventService.getOne(eventId);
  }

  @Post()
  async createEvent(@Body() json: EventRequestDto) {
    const entity = await this.eventService.createEvent(json);
    return await EventEntity.findOneBy({
      id: entity.id,
    });
  }

  @Put('/:eventId')
  async updateEvent(
    @Param('eventId') eventId: number,
    @Body() json: EventRequestDto,
  ) {
    const entity = await this.eventService.updateEvent(eventId, json);
    return await EventEntity.findOneBy({
      id: entity.id,
    });
  }

  @Delete('/:eventId')
  async delete(@Param('eventId') eventId: number) {
    return await this.eventService.deleteEvent(eventId);
  }
}
