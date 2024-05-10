import { Module, Global } from '@nestjs/common';
import * as winston from 'winston';

@Global()
@Module({
  providers: [
    {
      provide: 'WINSTON',
      useFactory: () => {
        return winston.createLogger({
          transports: [new winston.transports.Console()],
        });
      },
    },
  ],
  exports: ['WINSTON'],
})
export class WinstonModule {}
