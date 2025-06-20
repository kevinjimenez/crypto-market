import { CoinGeckoAdapterInterface } from '@coingecko/interfaces/coingecko-adapter.interface';
import { CoingeckoResponseInterface } from '@coingecko/interfaces/coingecko-response.interface';
import { AxiosAdapter } from '@common/adapters/axios.adapter';
import { EnvService } from '@common/services/env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoingeckoAdapter implements CoinGeckoAdapterInterface {
  private readonly API_URL: string;

  constructor(
    private readonly http: AxiosAdapter,
    private readonly envService: EnvService,
  ) {
    this.API_URL = this.envService.getConfigValue('coingeckoApi')!;
  }

  async getCoinMarkets(): Promise<CoingeckoResponseInterface[]> {
    try {
      const data = await this.http.get<CoingeckoResponseInterface[]>(
        `${this.API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`,
      );
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch coin markets: ${error.message}`);
    }
  }
}
