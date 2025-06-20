import { AxiosAdapter } from '@common/adapters/axios.adapter';
import { EnvService } from '@common/services/env.service';
import { CryptoMarketService } from '@crypto-market/crypto-market.service';
import { CoinGeckoCryptoResponse } from '@crypto-market/interfaces/coin-gecko-crypto.response';
import { coinGeckoToCryptoMarketMapper } from '@crypto-market/utils/coin-gecko-to-crypto-market.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly cryptoMarketService: CryptoMarketService,
    private readonly envService: EnvService,
  ) {}

  public async executeSeed() {
    const COINGECKO_API = this.envService.getConfigValue('coingeckoApi')!;

    try {
      await this.cryptoMarketService.deleteAll();

      const data =
        await this.http.get<CoinGeckoCryptoResponse[]>(COINGECKO_API);

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
