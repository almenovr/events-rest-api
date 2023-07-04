import { IsArray, IsObject, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { toArray, toObject } from '../../helper/cast.helper';

export class QueryDto {
  @Transform(({ value }) => toArray(value))
  @IsArray()
  @IsOptional()
  public sort: string[];

  @Transform(({ value }) => toArray(value))
  @IsArray()
  @IsOptional()
  public range: number[];

  @Transform(({ value }) => toObject(value))
  @IsObject()
  @IsOptional()
  public filter: object;
}
