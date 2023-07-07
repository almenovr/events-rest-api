import { StatusEnum } from '../enum/status.enum';

export interface EventRequestDto {
  name: string;
  description: string;
  periodDate: PeriodDate[];
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

export interface PeriodDate {
  startDate: Date;
  endDate: Date;
}
