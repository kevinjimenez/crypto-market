import { Controller, Get, Param, Query } from '@nestjs/common';
import { FiltersDto } from '../common/dtos/filters.dto';
import { CryptoMarketService } from './crypto-market.service';

@Controller('crypto-market')
export class CryptoMarketController {
  constructor(private readonly cryptoMarketService: CryptoMarketService) {}

  @Get(':tag')
  getHistoryCryptoMarketByTag(@Param('tag') tag: string) {
    return this.cryptoMarketService.getHistoryCryptoMarketByTag(tag);
  }

  @Get()
  findAll(@Query() filters: FiltersDto) {
    return this.cryptoMarketService.findAll(filters);
  }
}
