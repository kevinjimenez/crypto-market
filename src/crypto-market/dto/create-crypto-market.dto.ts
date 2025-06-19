import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateCryptoMarketDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  current_price: number;

  @IsNotEmpty()
  @IsNumber()
  high_1h: number;

  @IsNotEmpty()
  @IsNumber()
  low_1h: number;

  @IsNotEmpty()
  @IsNumber()
  avg: number;

  @IsNotEmpty()
  @IsString()
  signal: string;

  @IsNotEmpty()
  @IsString()
  trend: string;

  @IsNotEmpty()
  @IsBoolean()
  is_current: boolean;

  @IsNotEmpty()
  @IsString()
  tag: string;
}
