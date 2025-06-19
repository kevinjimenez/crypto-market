import { FiltersDto } from '@common/dtos/filters.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CryptoMarketService } from './crypto-market.service';

@Controller('crypto-market')
export class CryptoMarketController {
  constructor(private readonly cryptoMarketService: CryptoMarketService) {}

  @Get(':tag')
  findByTag(@Param('tag') tag: string) {
    return this.cryptoMarketService.findByTag(tag);
  }

  @Get()
  findAll(@Query() filters: FiltersDto) {
    return this.cryptoMarketService.findAll(filters);
  }
}
