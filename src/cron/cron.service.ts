import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CryptoMarketService } from '../crypto-market/crypto-market.service';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private isCronActive: boolean = true;

  constructor(private readonly cryptoMarketService: CryptoMarketService) {}

  public setCronStatus(active: boolean) {
    this.isCronActive = active;
    this.logger.log(`Cron job ${active ? 'activated' : 'deactivated'}`);
    return { status: 'success', active };
  }

  public getCronStatus() {
    return { active: this.isCronActive };
  }

  @Cron('*/3 * * * * *')
  async handleCron() {
    if (this.isCronActive) {
      this.logger.log('Executing scheduled sync...');
      await this.cryptoMarketService.syncCryptoMarket();
    }
  }
}
