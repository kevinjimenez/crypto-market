import { Injectable } from '@nestjs/common';
import { CryptoMarketRepository } from './crypto-market.repository';
import { CreateCryptoMarketDto } from './dto/create-crypto-market.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Filters } from 'src/common/interfaces/filters.interface';

@Injectable()
export class CryptoMarketService {
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

  public getLastCryptoMarket(tag: string) {
    return this.cryptoMarketRepository.getLastCryptoMarket(tag);
  }

  public findAll(page?: number, filters?: Filters) {
    return this.cryptoMarketRepository.getCryptoMarkets(page, filters);
  }

  public getHistoryCryptoMarketByTag(tag: string) {
    return this.cryptoMarketRepository.getHistoryCryptoMarketByTag(tag);
  }

  public moveToHistory() {
    return this.cryptoMarketRepository.moveToHistory();
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
}
