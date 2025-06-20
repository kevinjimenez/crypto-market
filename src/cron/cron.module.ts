import { CryptoMarketModule } from '@crypto-market/crypto-market.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CronController } from './cron.controller';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot(), CryptoMarketModule],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
