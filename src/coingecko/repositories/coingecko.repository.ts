import { CoingeckoAdapter } from '@coingecko/adapters/coingecko.adapter';
import { CoingeckoResponseInterface } from '@coingecko/interfaces/coingecko-response.interface';
import { Adapters } from '@common/enums/adapters.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoingeckoRepository {
  private adapters: Record<Adapters, CoingeckoAdapter>;

  constructor(coingecko: CoingeckoAdapter) {
    this.adapters = {
      [Adapters.COINGECKO]: coingecko,
    };
  }

  async getCoinMarkets(): Promise<CoingeckoResponseInterface[]> {
    try {
      const adapter = this.adapters[Adapters.COINGECKO];
      if (!adapter) throw new Error(`Adapter ${Adapters.COINGECKO} not found`);
      return await adapter.getCoinMarkets();
    } catch (error) {
      throw new Error(`Failed to fetch coin markets: ${error}`);
    }
  }
}
