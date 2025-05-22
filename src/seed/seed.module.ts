import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CryptoCurrencyModule } from 'src/crypto-currency/crypto-currency.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  imports: [CommonModule, CryptoCurrencyModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
