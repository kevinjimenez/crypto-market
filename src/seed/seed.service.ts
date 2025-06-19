import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { CryptoMarketService } from '../crypto-market/crypto-market.service';
import { CoinGeckoCryptoResponse } from '../crypto-market/interfaces/coin-gecko-crypto.response';
import { coinGeckoToCryptoMarketMapper } from '../crypto-market/utils/coin-gecko-to-crypto-market.mapper';
// import { Cron } from '@nestjs/schedule';

@Injectable()
export class SeedService {
  constructor(
    private readonly http: AxiosAdapter,
    private readonly cryptoMarketService: CryptoMarketService,
  ) {}

  // public async executeSeed() {
  //   const cryptosToCreate: CreateCryptoCurrencyDto[] = [];
  //   await this.cryptoCurrencyService.moveToHistory();

  //   const data = await this.http.get<CryptoResponse[]>(
  //     process.env.COINGECKO_API ?? '',
  //   );

  //   for (const crypto of data) {
  //     const lastCrypto = await this.cryptoCurrencyService.getLastCryptoCurrency(
  //       crypto.id,
  //     );

  //     const newCrypto = new CreateCryptoCurrencyDto();
  //     newCrypto.trend = lastCrypto?.trend ?? 'same';
  //     newCrypto.high_1h = lastCrypto?.high_1h ?? crypto.current_price;
  //     newCrypto.low_1h = lastCrypto?.low_1h ?? crypto.current_price;

  //     if (lastCrypto && crypto.current_price === lastCrypto.current_price) {
  //       newCrypto.trend = 'same';
  //     } else if (
  //       lastCrypto &&
  //       crypto.current_price > lastCrypto.current_price
  //     ) {
  //       newCrypto.trend = 'up';
  //       newCrypto.high_1h = crypto.current_price;
  //     } else if (
  //       lastCrypto &&
  //       crypto.current_price < lastCrypto.current_price
  //     ) {
  //       newCrypto.trend = 'down';
  //       newCrypto.low_1h = crypto.current_price;
  //     }

  //     newCrypto.name = crypto.name;
  //     newCrypto.image = crypto.image;
  //     newCrypto.symbol = crypto.symbol;
  //     newCrypto.current_price = crypto.current_price;

  //     const avg = (newCrypto.high_1h + newCrypto.low_1h) / 2;
  //     newCrypto.avg = avg;

  //     newCrypto.signal = crypto.current_price > avg ? 'B' : 'S';
  //     newCrypto.tag = crypto.id;
  //     newCrypto.is_current = true;
  //     cryptosToCreate.push(newCrypto);
  //   }

  //   await this.cryptoCurrencyService.createMany(cryptosToCreate);

  //   return 'Seed executed';
  // }

  public async executeSeed() {
    try {
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

  // public async executeSeed() {
  //   const cryptosToCreate: CreateCryptoCurrencyDto[] = [];
  //   await this.cryptoCurrencyService.moveToHistory();

  //   const data = await this.http.get<CryptoResponse[]>(
  //     process.env.COIN_API ?? '',
  //   );

  //   for (const crypto of data) {
  //     const lastCrypto = await this.cryptoCurrencyService.getLastCryptoCurrency(
  //       crypto.id,
  //     );

  //     // Simular variación aleatoria de precio sobre el último precio
  //     const basePrice = lastCrypto?.currentPrice ?? crypto.current_price;

  //     // Variación aleatoria +/- 1% (ajusta el % a tu gusto)
  //     const variationPercent = (Math.random() * 2 - 1) * 0.01; // valor entre -0.01 y 0.01
  //     const simulatedPrice = +(basePrice * (1 + variationPercent)).toFixed(6);

  //     const newCrypto = new CreateCryptoCurrencyDto();

  //     // Definir tendencia comparando con último precio
  //     if (!lastCrypto || simulatedPrice === lastCrypto.currentPrice) {
  //       newCrypto.trend = 'same';
  //       newCrypto.high1h = lastCrypto?.high1h ?? simulatedPrice;
  //       newCrypto.low1h = lastCrypto?.low1h ?? simulatedPrice;
  //     } else if (simulatedPrice > lastCrypto.currentPrice) {
  //       newCrypto.trend = 'up';
  //       newCrypto.high1h = Math.max(
  //         lastCrypto.high1h ?? simulatedPrice,
  //         simulatedPrice,
  //       );
  //       newCrypto.low1h = lastCrypto.low1h ?? simulatedPrice;
  //     } else {
  //       newCrypto.trend = 'down';
  //       newCrypto.low1h = Math.min(
  //         lastCrypto.low1h ?? simulatedPrice,
  //         simulatedPrice,
  //       );
  //       newCrypto.high1h = lastCrypto.high1h ?? simulatedPrice;
  //     }

  //     newCrypto.name = crypto.name;
  //     newCrypto.image = crypto.image;
  //     newCrypto.symbol = crypto.symbol;
  //     newCrypto.currentPrice = simulatedPrice;

  //     const avg = (newCrypto.high1h + newCrypto.low1h) / 2;
  //     newCrypto.avg = avg;

  //     // Señal: 'B' si precio actual > promedio, 'S' si es menor o igual
  //     newCrypto.signal = simulatedPrice > avg ? 'B' : 'S';
  //     newCrypto.tag = crypto.id;
  //     newCrypto.isCurrent = true;
  //     cryptosToCreate.push(newCrypto);
  //   }

  //   await this.cryptoCurrencyService.createMany(cryptosToCreate);

  //   return 'Seed executed with simulated data';
  // }

  // @Cron('*/12 * * * * *')
  // async handleCron() {
  //   console.log('Running seed');
  //   await this.executeSeed();
  // }
}
