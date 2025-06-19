import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { SIGNAL } from '../../crypto-market/enums/signal.enum';
import { TREND } from '../../crypto-market/enums/trend.enum';

export class FiltersDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(TREND)
  trend?: TREND;

  @IsOptional()
  @IsEnum(SIGNAL)
  signal?: SIGNAL;
}
