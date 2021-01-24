import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [LoginModule],
})
export class AppModule {}
