import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule } from './winston.module';

@Module({
  imports: [WinstonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
