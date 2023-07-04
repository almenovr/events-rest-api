import { StatusEnum } from '../enum/status.enum';

export interface EventRequestDto {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  venue: Venue;
  thumbnail: string;
  status: StatusEnum;
}

export interface Venue {
  name: string;
  country: string;
  state: string;
  city: string;
  timezone: string;
  zip_code: string;
  address: string;
}
