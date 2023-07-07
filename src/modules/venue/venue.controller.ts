import { Controller, Get, Query } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueEntity } from '../../data-base/entites/venue.entity';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}
  @Get()
  async getManyReference(@Query() query): Promise<VenueEntity[]> {
    return await this.venueService.getManyReference(
      JSON.parse(query.filter).event_id,
    );
  }
}
