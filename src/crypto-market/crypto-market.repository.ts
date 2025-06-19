import { Injectable } from '@nestjs/common';
import { crypto_market, Prisma } from '@prisma/client';
import { Filters } from 'src/common/interfaces/filters.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CryptoMarketRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  // public createCryptoMarket(
  //   payload: Prisma.crypto_marketCreateInput,
  // ): Promise<crypto_market> {
  //   return this.databaseService.crypto_market.create({
  //     data: payload,
  //   });
  // }

  public createMany(payload: Prisma.crypto_marketCreateInput[]) {
    return this.databaseService.crypto_market.createMany({ data: payload });
  }

  public moveToHistory() {
    return this.databaseService.crypto_market.updateMany({
      data: { is_current: false },
    });
  }

  public getLastCryptoMarket(tag: string) {
    return this.databaseService.crypto_market.findFirst({
      where: { tag },
      orderBy: { created_at: 'desc' },
    });
  }

  public getCryptoMarkets(
    page: number = 1,
    filters?: Filters,
  ): Promise<crypto_market[]> {
    const limit = 5;
    const skip = (page - 1) * limit;

    return this.databaseService.crypto_market.findMany({
      where: {
        is_current: true,
        ...(filters?.name && {
          name: {
            contains: filters.name,
            mode: 'insensitive',
          },
        }),
        ...(filters?.trend && {
          trend: {
            equals: filters.trend,
          },
        }),
        ...(filters?.signal && {
          signal: {
            equals: filters.signal,
          },
        }),
      },
      skip,
      take: limit,
      orderBy: { created_at: 'desc' },
    });
  }

  public getHistoryCryptoMarketByTag(tag: string): Promise<crypto_market[]> {
    return this.databaseService.crypto_market.findMany({
      where: {
        tag,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  public async deleteAll() {
    await this.databaseService.crypto_market.deleteMany({});
    return 'delete all';
  }
}
