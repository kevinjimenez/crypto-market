import { Module } from '@nestjs/common';
import { CoingeckoAdapter } from './adapters/coingecko.adapter';
import { CoingeckoRepository } from './repositories/coingecko.repository';
import { CoingeckoService } from './coingecko.service';

@Module({
  providers: [CoingeckoAdapter, CoingeckoRepository, CoingeckoService],
  exports: [CoingeckoService],
})
export class CoingeckoModule {}
