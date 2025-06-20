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
    if (coinGeckoCrypto.current_price > cryptoMarket.current_price) {
      newCryptoMarket.trend = TREND.UP;
      newCryptoMarket.high_1h = coinGeckoCrypto.current_price;
    } else if (coinGeckoCrypto.current_price < cryptoMarket.current_price) {
      newCryptoMarket.trend = TREND.DOWN;
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
