import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationController } from './translation.controller';

@Module({
  imports: [],
  controllers: [AppController, TranslationController],
  providers: [AppService],
})
export class AppModule {}
