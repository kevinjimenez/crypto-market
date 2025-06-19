import { Module } from '@nestjs/common';
import { CryptoMarketService } from './crypto-market.service';
import { CryptoMarketController } from './crypto-market.controller';
import { CryptoMarketRepository } from './crypto-market.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule],
  controllers: [CryptoMarketController],
  providers: [CryptoMarketService, CryptoMarketRepository],
  exports: [CryptoMarketService, CryptoMarketRepository],
})
export class CryptoMarketModule {}
