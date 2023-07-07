import { Injectable } from '@nestjs/common';
import { VenueEntity } from '../../data-base/entites/venue.entity';

@Injectable()
export class VenueService {
  async getManyReference(eventId: number) {
    return await VenueEntity.findBy({
      eventId: eventId,
    });
  }
}
