import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CryptoMarketModule } from 'src/crypto-market/crypto-market.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [CommonModule, CryptoMarketModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
