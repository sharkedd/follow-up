import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

// para prueba, luego estara en .env
const url = 'https://hc-ping.com/122112dd-8fb6-4cf7-9e60-210bc4286497';

@Injectable()
export class RandomLoggerService {
  private readonly logger = new Logger(RandomLoggerService.name);
  private executionCount = 0;

  @Cron('*/2 * * * *') //
  async handleCron() {
    console.log('a');
    await this.ping(url + '/start');
    try {
      this.executionCount++;

      const randomNumber = Math.random(); // Genera un número aleatorio
      console.log(`Número aleatorio generado: ${randomNumber}`);
      await this.ping(url);
    } catch (error) {
      await this.ping(url + '/fail');
    }
  }

  async ping(url: string) {
    try {
      await axios.get(url, { timeout: 5000 });
    } catch (error) {
      // Log the error and continue. A ping failure should
      // not prevent the job from running.
      console.error('Ping failed: ' + error);
    }
  }
}
