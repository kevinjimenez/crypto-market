import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoingeckoModule } from './coingecko/coingecko.module';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { CronModule } from './cron/cron.module';
import { CryptoMarketModule } from './crypto-market/crypto-market.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { SeedModule } from './seed/seed.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    // Serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CommonModule,
    HealthModule,
    DatabaseModule,
    SeedModule,
    CryptoMarketModule,
    CronModule,
    // external data
    CoingeckoModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
