import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { SeedModule } from './seed/seed.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CryptoMarketModule } from './crypto-market/crypto-market.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    ScheduleModule.forRoot(),
    CommonModule,
    HealthModule,
    DatabaseModule,
    SeedModule,
    CryptoMarketModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
