import { PaginationDto } from '@common/dtos/pagination.dto';
import { SIGNAL } from '@crypto-market/enums/signal.enum';
import { TREND } from '@crypto-market/enums/trend.enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CryptoMarketQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || undefined)
  name?: string;

  @IsOptional()
  @IsEnum(TREND, {
    message: `trend must be one of: ${Object.values(TREND).join(', ')}`,
  })
  @Transform(({ value }) => value || undefined)
  trend?: TREND;

  @IsOptional()
  @IsEnum(SIGNAL, {
    message: `signal must be one of: ${Object.values(SIGNAL).join(', ')}`,
  })
  @Transform(({ value }) => value || undefined)
  signal?: SIGNAL;
}
