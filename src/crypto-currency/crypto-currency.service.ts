import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CryptoCurrencyRepository } from './crypto-currency.repository';
import { CreateCryptoCurrencyDto } from './dto/create-crypto-currency.dto';
import { Filters } from '../common/interfaces/filters.interface';

@Injectable()
export class CryptoCurrencyService {
  constructor(
    private readonly cryptoCurrencyRepository: CryptoCurrencyRepository,
  ) {}

  public async createMany(payload: CreateCryptoCurrencyDto[]) {
    try {
      const results = await this.cryptoCurrencyRepository.createMany(payload);
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  public getLastCryptoCurrency(tag: string) {
    return this.cryptoCurrencyRepository.getLastCryptoCurrency(tag);
  }

  public findAll(page?: number, filters?: Filters) {
    return this.cryptoCurrencyRepository.getCryptoCurrencies(page, filters);
  }

  public getHistoryCryptoCurrencyByTag(tag: string) {
    return this.cryptoCurrencyRepository.getHistoryCryptoCurrencyByTag(tag);
  }

  public moveToHistory() {
    return this.cryptoCurrencyRepository.moveToHistory();
  }

  public async deleteAll() {
    try {
      const results = await this.cryptoCurrencyRepository.deleteAll();
      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
