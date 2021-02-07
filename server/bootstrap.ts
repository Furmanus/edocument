import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import { resolve } from 'path';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

const { PORT } = process.env;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.use(json());
  app.useStaticAssets(resolve(__dirname, '..', 'dist'));
  app.setBaseViewsDir(resolve(__dirname, '..', 'dist'));
  app.setViewEngine('hbs');

  await app.listen(PORT || 3000);
}

bootstrap();
