import { Controller, Get, Param, Query } from '@nestjs/common';
import { CryptoMarketService } from './crypto-market.service';
import { CryptoMarketQueryDto } from './dto/crypto-market-query.dto';

@Controller('crypto-market')
export class CryptoMarketController {
  constructor(private readonly cryptoMarketService: CryptoMarketService) {}

  @Get(':tag')
  findByTag(@Param('tag') tag: string) {
    return this.cryptoMarketService.findByTag(tag);
  }

  @Get()
  findAll(@Query() query: CryptoMarketQueryDto) {
    return this.cryptoMarketService.findAll(query);
  }
}
