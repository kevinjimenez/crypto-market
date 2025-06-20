import { Controller, Post } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Post('status')
  getStatus() {
    return this.cronService.getCronStatus();
  }

  @Post('activate')
  activate() {
    return this.cronService.setCronStatus(true);
  }

  @Post('deactivate')
  deactivate() {
    return this.cronService.setCronStatus(false);
  }
}
