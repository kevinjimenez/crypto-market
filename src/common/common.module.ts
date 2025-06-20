import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AxiosAdapter } from './adapters/axios.adapter';
import { EnvService } from './services/env.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [AxiosAdapter, EnvService],
  exports: [AxiosAdapter, EnvService],
})
export class CommonModule {}
