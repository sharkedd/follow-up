import { Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
  exports: [HealthcheckService],
  imports: [EmailModule],
})
export class HealthcheckModule {}
