import { CryptoMarketModule } from '@crypto-market/crypto-market.module';
import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [CryptoMarketModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
