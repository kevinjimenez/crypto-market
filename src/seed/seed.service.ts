import { CryptoMarketService } from '@crypto-market/crypto-market.service';
import { coingeckoToCryptoMarketMapper } from '@crypto-market/utils/coingecko-to-crypto-market.mapper';
import { Injectable } from '@nestjs/common';
import { CoingeckoService } from 'coingecko/coingecko.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly cryptoMarketService: CryptoMarketService,
    private readonly coingeckoService: CoingeckoService,
  ) {}

  public async executeSeed() {
    try {
      await this.cryptoMarketService.deleteAll();

      const coins = await this.coingeckoService.getCoinMarkets();
      const cryptos = coins.map((coin) => coingeckoToCryptoMarketMapper(coin));

      await this.cryptoMarketService.createMany(cryptos);
      return 'Seed executed';
    } catch (error) {
      console.log(JSON.stringify({ error }, null, 2));
      return 'Seed executed with error';
    }
  }
}
