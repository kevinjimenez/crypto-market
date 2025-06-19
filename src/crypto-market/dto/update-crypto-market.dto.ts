import { PartialType } from '@nestjs/swagger';
import { CreateCryptoMarketDto } from './create-crypto-market.dto';

export class UpdateCryptoMarketDto extends PartialType(CreateCryptoMarketDto) {}
