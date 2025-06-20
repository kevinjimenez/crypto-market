import { Injectable } from '@nestjs/common';
import { CoingeckoResponseInterface } from './interfaces/coingecko-response.interface';
import { CoingeckoRepository } from './repositories/coingecko.repository';

@Injectable()
export class CoingeckoService {
  constructor(private readonly repository: CoingeckoRepository) {}

  getCoinMarkets(): Promise<CoingeckoResponseInterface[]> {
    return this.repository.getCoinMarkets();
  }
}
