import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import { type Health } from './interfaces/health.interface';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth(): Health {
    return this.healthService.checkStatus();
  }
}
