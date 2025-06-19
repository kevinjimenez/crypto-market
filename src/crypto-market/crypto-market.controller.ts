import { Controller, Get, Param, Query } from '@nestjs/common';
import { CryptoMarketService } from './crypto-market.service';

@Controller('crypto-market')
export class CryptoMarketController {
  constructor(private readonly cryptoMarketService: CryptoMarketService) {}

  @Get(':tag')
  getHistoryCryptoMarketByTag(@Param('tag') tag: string) {
    return this.cryptoMarketService.getHistoryCryptoMarketByTag(tag);
  }

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('name') name: string,
    @Query('trend') trend: string,
    @Query('signal') signal: string,
  ) {
    if (name || trend || signal) {
      return this.cryptoMarketService.findAll(page, {
        name,
        trend,
        signal,
      });
    }
    return this.cryptoMarketService.findAll(page);
  }
}
