import { PaginationDto } from '@common/dtos/pagination.dto';
import { SIGNAL } from '@crypto-market/enums/signal.enum';
import { TREND } from '@crypto-market/enums/trend.enum';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CryptoMarketQueryDto extends PaginationDto {
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
