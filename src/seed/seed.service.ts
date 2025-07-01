import { CoingeckoService } from '@coingecko/coingecko.service';
import { CryptoMarketService } from '@crypto-market/crypto-market.service';
import { coingeckoToCryptoMarketMapper } from '@crypto-market/utils/coingecko-to-crypto-market.mapper';
import { ApiResponse } from '@common/interfaces/api-response.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(
    private readonly cryptoMarketService: CryptoMarketService,
    private readonly coingeckoService: CoingeckoService,
  ) {}

  public async executeSeed(): Promise<ApiResponse<string>> {
    try {
      await this.cryptoMarketService.deleteAll();

      const coins = await this.coingeckoService.getCoinMarkets();
      const cryptos = coins.map((coin) => coingeckoToCryptoMarketMapper(coin));

      await this.cryptoMarketService.createMany(cryptos);
      return {
        data: 'Seed executed',
      };
    } catch (error) {
      console.log(JSON.stringify({ error }, null, 2));
      return {
        data: 'Seed executed with error',
      };
    }
  }
}
