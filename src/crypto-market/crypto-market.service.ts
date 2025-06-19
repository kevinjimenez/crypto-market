import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FiltersDto } from 'src/common/dtos/filters.dto';
import { CryptoMarketRepository } from './crypto-market.repository';
import { CreateCryptoMarketDto } from './dto/create-crypto-market.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class CryptoMarketService {
  private lastApiCallTime: number = 0;
  private readonly MIN_TIME_BETWEEN_CALLS = 2500; // 2.5 seconds between calls
  private readonly logger = new Logger(CryptoMarketService.name);

  constructor(
    private readonly cryptoMarketRepository: CryptoMarketRepository,
  ) {}

  public async createMany(payload: CreateCryptoMarketDto[]) {
    try {
      const results = await this.cryptoMarketRepository.createMany(payload);
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating crypto market');
    }
  }

  public findAll(filters: FiltersDto) {
    return this.cryptoMarketRepository.findAll(filters);
  }

  public getHistoryCryptoMarketByTag(tag: string) {
    return this.cryptoMarketRepository.getHistoryCryptoMarketByTag(tag);
  }

  public async deleteAll() {
    try {
      const results = await this.cryptoMarketRepository.deleteAll();
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  @Cron('*/3 * * * * *')
  async syncCryptoMarketJob() {
    await this.fetchAndProcessCryptoMarket();
  }

  private async fetchAndProcessCryptoMarket() {
    const now = Date.now();
    const timeSinceLastCall = now - this.lastApiCallTime;

    if (timeSinceLastCall < this.MIN_TIME_BETWEEN_CALLS) {
      const waitTime = this.MIN_TIME_BETWEEN_CALLS - timeSinceLastCall;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    try {
      this.logger.log('Fetching crypto market data...');
      this.lastApiCallTime = Date.now();

      const { meta } = await this.findAll({});

      if (meta && meta.total > 0) {
        this.logger.log(`Found ${meta.total} crypto market entries`);
        await this.cryptoMarketRepository.ingestCryptoMarket();
      } else {
        this.logger.warn('No crypto market data found');
      }
    } catch (error) {
      this.logger.error(
        `Error in fetchAndProcessCryptoMarket: ${error.message}`,
        error.stack,
      );

      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 60;
        this.logger.warn(
          `Rate limit exceeded. Retrying after ${retryAfter} seconds`,
        );

        // Usa setTimeout o un job externo para reintentar, no recursion directa
        setTimeout(() => {
          void this.fetchAndProcessCryptoMarket();
        }, retryAfter * 1000);
      }
    }
  }
}
