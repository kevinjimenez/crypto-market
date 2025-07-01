import { CoingeckoResponseInterface } from '@coingecko/interfaces/coingecko-response.interface';
import { CreateCryptoMarketDto } from '@crypto-market/dto/create-crypto-market.dto';
import { SIGNAL } from '@crypto-market/enums/signal.enum';
import { TREND } from '@crypto-market/enums/trend.enum';
import { crypto_market } from '@prisma/client';

export const coingeckoToCryptoMarketMapper = (
  coinGeckoCrypto: CoingeckoResponseInterface,
  cryptoMarket?: crypto_market,
): CreateCryptoMarketDto => {
  const newCryptoMarket = new CreateCryptoMarketDto();

  // Set basic properties
  newCryptoMarket.name = coinGeckoCrypto.name;
  newCryptoMarket.image = coinGeckoCrypto.image;
  newCryptoMarket.symbol = coinGeckoCrypto.symbol;
  newCryptoMarket.current_price = coinGeckoCrypto.current_price;
  newCryptoMarket.tag = coinGeckoCrypto.id;
  newCryptoMarket.is_current = true;

  // Initialize with last values or current price
  newCryptoMarket.high_1h =
    cryptoMarket?.high_1h ?? coinGeckoCrypto.current_price;
  newCryptoMarket.low_1h =
    cryptoMarket?.low_1h ?? coinGeckoCrypto.current_price;
  newCryptoMarket.trend = cryptoMarket?.trend ?? TREND.SAME;

  // Update trend and price boundaries
  if (cryptoMarket) {
    // Update trend
    if (coinGeckoCrypto.current_price > cryptoMarket.current_price) {
      newCryptoMarket.trend = TREND.UP;
    } else if (coinGeckoCrypto.current_price < cryptoMarket.current_price) {
      newCryptoMarket.trend = TREND.DOWN;
    }

    // Update 1h high and low
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);

    // If last update was within 1 hour, compare with previous high/low
    if (cryptoMarket.updated_at > oneHourAgo) {
      newCryptoMarket.high_1h = Math.max(
        Number(cryptoMarket.high_1h),
        Number(coinGeckoCrypto.current_price),
      );
      newCryptoMarket.low_1h = Math.min(
        Number(cryptoMarket.low_1h),
        Number(coinGeckoCrypto.current_price),
      );
    } else {
      // If more than 1 hour has passed, reset with current price
      newCryptoMarket.high_1h = coinGeckoCrypto.current_price;
      newCryptoMarket.low_1h = coinGeckoCrypto.current_price;
    }
  }

  // Calculate average and signal
  const avg = (newCryptoMarket.high_1h + newCryptoMarket.low_1h) / 2;
  newCryptoMarket.avg = avg;
  newCryptoMarket.signal =
    coinGeckoCrypto.current_price > avg ? SIGNAL.BUY : SIGNAL.SELL;

  return newCryptoMarket;
};
