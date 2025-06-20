import { CoingeckoModule } from '@coingecko/coingecko.module';
import { CryptoMarketModule } from '@crypto-market/crypto-market.module';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [CoingeckoModule, CryptoMarketModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
