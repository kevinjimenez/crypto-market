import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CryptoMarketRepository } from './crypto-market.repository';
import { CreateCryptoMarketDto } from './dto/create-crypto-market.dto';
import { CryptoMarketQueryDto } from './dto/crypto-market-query.dto';

@Injectable()
export class CryptoMarketService {
  private lastApiCallTime: number = 0;
  private readonly MIN_TIME_BETWEEN_CALLS = 3000;
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

  public findAll(query: CryptoMarketQueryDto) {
    return this.cryptoMarketRepository.findAll(query);
  }

  public findByTag(tag: string) {
    return this.cryptoMarketRepository.findByTag(tag);
  }

  public async deleteAll() {
    try {
      const results = await this.cryptoMarketRepository.deleteAll();
      return results;
    } catch (error) {
      this.logger.error(
        `Failed to delete all crypto market data: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to delete crypto market data. Please try again later.',
        {
          cause: error,
          description: error.message,
        },
      );
    }
  }

  /**
   * Syncs the cryptocurrency market
   * This method is called by CronService
   */
  public async syncCryptoMarket() {
    return this.fetchAndProcessCryptoMarket();
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

        // Use setTimeout or an external job for retries, not direct recursion
        setTimeout(() => {
          void this.fetchAndProcessCryptoMarket();
        }, retryAfter * 1000);
      }
    }
  }
}
