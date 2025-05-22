import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const logger = new Logger('DatabaseService');

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      logger.log('Database connect');
    } catch (err) {
      logger.error(`DatabaseService err: [${err}]`);
    }
  }
}
