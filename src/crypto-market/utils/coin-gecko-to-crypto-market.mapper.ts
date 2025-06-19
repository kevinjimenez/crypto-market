import { CreateCryptoMarketDto } from '../dto/create-crypto-market.dto';
import { SIGNAL } from '../enums/signal.enum';
import { TREND } from '../enums/trend.enum';
import { CoinGeckoCryptoResponse } from '../interfaces/coin-gecko-crypto.response';

export const coinGeckoToCryptoMarketMapper = (
  coinGeckoCrypto: CoinGeckoCryptoResponse,
): CreateCryptoMarketDto => {
  const avg = coinGeckoCrypto.current_price + coinGeckoCrypto.current_price / 2;

  return {
    tag: coinGeckoCrypto.id,
    name: coinGeckoCrypto.name,
    avg,
    current_price: coinGeckoCrypto.current_price,
    image: coinGeckoCrypto.image,
    high_1h: coinGeckoCrypto.current_price,
    low_1h: coinGeckoCrypto.current_price,
    symbol: coinGeckoCrypto.symbol,
    signal: coinGeckoCrypto.current_price > avg ? SIGNAL.BUY : SIGNAL.SELL,
    trend: TREND.SAME,
    is_current: true,
  };
};
