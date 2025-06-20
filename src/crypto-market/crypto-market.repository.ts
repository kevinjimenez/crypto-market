import { CoingeckoService } from '@coingecko/coingecko.service';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { DatabaseService } from '@database/database.service';
import { Injectable, Logger } from '@nestjs/common';
import { crypto_market, Prisma } from '@prisma/client';
import { CreateCryptoMarketDto } from './dto/create-crypto-market.dto';
import { CryptoMarketQueryDto } from './dto/crypto-market-query.dto';
import { coingeckoToCryptoMarketMapper } from './utils/coingecko-to-crypto-market.mapper';

@Injectable()
export class CryptoMarketRepository {
  private readonly BATCH_SIZE = 100;
  private readonly logger = new Logger(CryptoMarketRepository.name);
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly coingeckoService: CoingeckoService,
  ) {}

  public createMany(payload: Prisma.crypto_marketCreateInput[]) {
    return this.databaseService.crypto_market.createMany({ data: payload });
  }

  public async findAll(
    query: CryptoMarketQueryDto,
  ): Promise<ApiResponse<crypto_market[]>> {
    try {
      const { page = 1, limit = 5, ...rest } = query;
      const skip = (page - 1) * limit;

      const where: Prisma.crypto_marketWhereInput = {
        is_current: true,
      };

      if (rest.name) {
        where.name = {
          contains: rest.name,
          mode: 'insensitive',
        };
      }

      if (rest.trend) {
        where.trend = {
          equals: rest.trend,
        };
      }

      if (rest.signal) {
        where.signal = {
          equals: rest.signal,
        };
      }

      const [data, total] = await Promise.all([
        this.databaseService.crypto_market.findMany({
          where,
          skip,
          take: limit,
          orderBy: { created_at: 'desc' },
        }),
        this.databaseService.crypto_market.count({ where }),
      ]);

      return {
        data,
        meta: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error(
        `Error fetching crypto markets: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to fetch crypto markets');
    }
  }

  public findByTag(tag: string): Promise<crypto_market[]> {
    return this.databaseService.crypto_market.findMany({
      where: {
        tag,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  public async deleteAll() {
    try {
      await this.databaseService.crypto_market.deleteMany({});
      return 'delete all';
    } catch (error) {
      this.logger.error(
        `Error deleting crypto markets: ${error.message}`,
        error.stack,
      );
      throw new Error('Failed to delete crypto markets');
    }
  }

  public async ingestCryptoMarket() {
    try {
      return await this.databaseService.$transaction(
        async (tx) => {
          const cryptoToCreate: CreateCryptoMarketDto[] = [];

          /**
           * Executes in parallel:
           * 1. Archives current market data to history
           * 2. Fetches fresh market data from the CoinGecko API
           *
           * This concurrent execution improves performance by not waiting for
           * the history update to complete before starting the API request.
           */
          const [, data] = await Promise.all([
            tx.crypto_market.updateMany({
              where: { is_current: true },
              data: { is_current: false },
            }),
            this.coingeckoService.getCoinMarkets(),
          ]);

          if (!data?.length) {
            throw new Error(
              'Failed to fetch cryptocurrency data from the CoinGecko API. The response was empty or invalid.',
            );
          }

          /**
           * Fetches the most recent historical records for each cryptocurrency
           * from the database. This is used to calculate price trends and signals
           * by comparing with the new market data.
           *
           * The query:
           * - Filters for non-current records (is_current = false)
           * - Gets only the most recent record per cryptocurrency (distinct by tag)
           * - Orders by creation date in descending order
           */
          const previousCryptos =
            await this.databaseService.crypto_market.findMany({
              where: {
                tag: { in: data.map((c) => c.id) },
                is_current: false,
              },
              orderBy: { created_at: 'desc' },
              distinct: ['tag'],
            });

          /**
           * Creates a map of previous crypto market records for easy lookup.
           * The map is used to compare new data with existing records.
           */
          const mapPreviousCrypto = new Map(
            previousCryptos.map((c) => [c.tag, c] as [string, typeof c]),
          );
          // const mapPreviousCrypto = new Map(
          //   previousCryptos.map((c) => [c.tag, c] as [string, typeof c]),
          // );

          /**
           * Creates a new crypto market record for each cryptocurrency in the response.
           * The new record is created by comparing the new data with the previous record.
           */
          for (const crypto of data) {
            const previousCrypto = mapPreviousCrypto.get(crypto.id);
            const newCrypto = coingeckoToCryptoMarketMapper(
              crypto,
              previousCrypto,
            );
            cryptoToCreate.push(newCrypto);
          }

          /**
           * Inserts the new crypto market records in batches to avoid
           * performance issues with large datasets.
           */
          for (let i = 0; i < cryptoToCreate.length; i += this.BATCH_SIZE) {
            const batch = cryptoToCreate.slice(i, i + this.BATCH_SIZE);
            await tx.crypto_market.createMany({
              data: batch,
              skipDuplicates: true,
            });
          }

          this.logger.debug('Created');

          return {
            success: true,
            message: 'Cryptocurrency market data has been successfully updated',
            timestamp: new Date().toISOString(),
            recordsProcessed: cryptoToCreate.length,
          };
        },
        {
          maxWait: 10000,
          timeout: 60000,
        },
      );
    } catch (error) {
      const msg =
        `Failed to complete cryptocurrency data update transaction: ${error.message}. ` +
        'Please check the logs for more details and ensure the database connection is stable.';
      this.logger.error(msg, error.stack);
      throw new Error(msg);
    }
  }
}
