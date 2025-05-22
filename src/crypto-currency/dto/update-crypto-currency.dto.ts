import { PartialType } from '@nestjs/swagger';
import { CreateCryptoCurrencyDto } from './create-crypto-currency.dto';

export class UpdateCryptoCurrencyDto extends PartialType(
  CreateCryptoCurrencyDto,
) {}
