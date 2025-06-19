import { AxiosAdapter } from '@common/adapters/axios.adapter';
import { CryptoMarketService } from '@crypto-market/crypto-market.service';
import { CoinGeckoCryptoResponse } from '@crypto-market/interfaces/coin-gecko-crypto.response';
import { coinGeckoToCryptoMarketMapper } from '@crypto-market/utils/coin-gecko-to-crypto-market.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly cryptoMarketService: CryptoMarketService,
  ) {}

  public async executeSeed() {
    try {
      await this.cryptoMarketService.deleteAll();

      const data = await this.http.get<CoinGeckoCryptoResponse[]>(
        process.env.COINGECKO_API ?? '',
      );

      const cryptos = data.map((crypto) =>
        coinGeckoToCryptoMarketMapper(crypto),
      );

      await this.cryptoMarketService.createMany(cryptos);
      return 'Seed executed';
    } catch (error) {
      console.log(JSON.stringify({ error }, null, 2));
      return 'Seed executed with error';
    }
  }
}
