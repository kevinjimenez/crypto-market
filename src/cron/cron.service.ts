import { ApiResponse } from '@common/interfaces/api-response.interface';
import { CryptoMarketService } from '@crypto-market/crypto-market.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronResponse } from './interfaces/cron.response';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);
  private isCronActive: boolean = false;

  constructor(private readonly cryptoMarketService: CryptoMarketService) {}

  public setCronStatus(active: boolean): ApiResponse<CronResponse> {
    this.isCronActive = active;
    this.logger.log(`Cron job ${active ? 'activated' : 'deactivated'}`);
    return {
      data: {
        status: active,
        message: `Cron job ${active ? 'activated' : 'deactivated'}`,
      },
    };
  }

  public getCronStatus(): ApiResponse<CronResponse> {
    return {
      data: {
        status: this.isCronActive,
        message: `Cron job ${this.isCronActive ? 'activated' : 'deactivated'}`,
      },
    };
  }

  @Cron('*/3 * * * * *')
  async handleCron() {
    if (this.isCronActive) {
      this.logger.log('Executing scheduled sync...');
      await this.cryptoMarketService.syncCryptoMarket();
    }
  }
}
