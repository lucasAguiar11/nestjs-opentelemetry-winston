import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'winston';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('WINSTON') private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.info('Hello World! 2');
    return this.appService.getHello();
  }
}
