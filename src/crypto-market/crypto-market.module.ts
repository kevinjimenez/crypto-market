import { Module } from '@nestjs/common';
import { CryptoMarketService } from './crypto-market.service';
import { CryptoMarketController } from './crypto-market.controller';
import { CryptoMarketRepository } from './crypto-market.repository';

@Module({
  controllers: [CryptoMarketController],
  providers: [CryptoMarketService, CryptoMarketRepository],
  exports: [CryptoMarketService, CryptoMarketRepository],
})
export class CryptoMarketModule {}
