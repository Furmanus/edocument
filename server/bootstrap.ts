import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';

config();

const { PORT } = process.env;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(resolve(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(PORT || 3000);
}

bootstrap();
