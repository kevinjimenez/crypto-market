import { CoingeckoResponseInterface } from './coingecko-response.interface';

export interface CoinGeckoAdapterInterface {
  getCoinMarkets(): Promise<CoingeckoResponseInterface[]>;
}
