import { Controller, Get } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthCheckService: HealthcheckService) {}

  @Get()
  async checkServices() {
    this.healthCheckService.checkServices();
  }
}
