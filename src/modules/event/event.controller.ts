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
    await this.eventService.createEvent(json);
  }

  @Put('/:eventId')
  async updateEvent(
    @Param('eventId') eventId: number,
    @Body() json: EventRequestDto,
  ) {
    await this.eventService.updateEvent(eventId, json);
  }

  @Delete('/:eventId')
  async delete(@Param('eventId') eventId: number) {
    await this.eventService.deleteEvent(eventId);
  }
}
