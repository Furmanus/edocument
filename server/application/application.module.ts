import { Module } from '@nestjs/common';
import { ApplicationController } from './controllers/application.controller';

@Module({
  controllers: [ApplicationController],
})
export class ApplicationModule {}
