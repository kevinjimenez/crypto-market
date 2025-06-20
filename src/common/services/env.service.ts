import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { EnvConfiguration } from '../config/env.config';
export type EnvConfig = ReturnType<typeof EnvConfiguration>;

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<EnvConfig, true>) {}

  public getConfigValue<T extends keyof EnvConfig>(key: T): EnvConfig[T] {
    const value = this.configService.get(key);
    if (value === undefined || value === null) {
      throw new Error(`Configuration key '${String(key)}' is not set`);
    }
    return value;
  }
}
