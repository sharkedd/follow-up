import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
