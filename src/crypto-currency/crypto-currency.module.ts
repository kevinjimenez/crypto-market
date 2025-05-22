import { Module } from '@nestjs/common';
import { CryptoCurrencyController } from './crypto-currency.controller';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyRepository } from './crypto-currency.repository';

@Module({
  controllers: [CryptoCurrencyController],
  providers: [CryptoCurrencyService, CryptoCurrencyRepository],
  exports: [CryptoCurrencyService, CryptoCurrencyRepository],
})
export class CryptoCurrencyModule {}
