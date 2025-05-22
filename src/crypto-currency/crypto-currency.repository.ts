import { Injectable } from '@nestjs/common';
import { CryptoCurrency, Prisma } from '@prisma/client';
import { Filters } from 'src/common/interfaces/filters.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CryptoCurrencyRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  public createCryptoCurrency(
    payload: Prisma.CryptoCurrencyCreateInput,
  ): Promise<CryptoCurrency> {
    return this.databaseService.cryptoCurrency.create({
      data: payload,
    });
  }

  public createMany(payload: Prisma.CryptoCurrencyCreateInput[]) {
    return this.databaseService.cryptoCurrency.createMany({ data: payload });
  }

  public moveToHistory() {
    return this.databaseService.cryptoCurrency.updateMany({
      data: { isCurrent: false },
    });
  }

  public getLastCryptoCurrency(tag: string) {
    return this.databaseService.cryptoCurrency.findFirst({
      where: { tag },
      orderBy: { createdAt: 'desc' },
    });
  }

  public getCryptoCurrencies(
    page: number = 1,
    filters?: Filters,
  ): Promise<CryptoCurrency[]> {
    const limit = 5;
    const skip = (page - 1) * limit;

    return this.databaseService.cryptoCurrency.findMany({
      where: {
        isCurrent: true,
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
      orderBy: { createdAt: 'desc' },
    });
  }

  public getHistoryCryptoCurrencyByTag(tag: string): Promise<CryptoCurrency[]> {
    return this.databaseService.cryptoCurrency.findMany({
      where: {
        tag,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async deleteAll() {
    await this.databaseService.cryptoCurrency.deleteMany({});
    return 'delete all';
  }
}
