import telemetry from './telemetry';
telemetry();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';

async function bootstrap() {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
  });
  const app = await NestFactory.create(AppModule, { logger });
  await app.listen(3000);
}
bootstrap();
