import { Controller, Get, Query } from '@nestjs/common';
import { VenueService } from './venue.service';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}
  @Get()
  async getManyReference(@Query() query) {
    return await this.venueService.getManyReference(
      JSON.parse(query.filter).event_id,
    );
  }
}
