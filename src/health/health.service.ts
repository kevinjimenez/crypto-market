import { Injectable } from '@nestjs/common';
import { type Health } from './interfaces/health.interface';

@Injectable()
export class HealthService {
  checkStatus(): Health {
    return {
      environment: process.env.NODE_ENV || 'local',
      message: 'api-cripto is up and running',
      port: process.env.PORT || '3000',
    };
  }
}
