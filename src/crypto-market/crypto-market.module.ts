import { Module } from '@nestjs/common';
import { CryptoMarketController } from './crypto-market.controller';
import { CryptoMarketRepository } from './crypto-market.repository';
import { CryptoMarketService } from './crypto-market.service';

@Module({
  controllers: [CryptoMarketController],
  providers: [CryptoMarketService, CryptoMarketRepository],
  exports: [CryptoMarketService, CryptoMarketRepository],
})
export class CryptoMarketModule {}
