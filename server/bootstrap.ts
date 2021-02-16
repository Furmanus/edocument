import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import * as helmet from 'helmet';
import * as expressSession from 'express-session';
import { resolve } from 'path';
import { AppModule } from './app.module';

const { PORT } = process.env;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.use(json());
  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useStaticAssets(resolve(__dirname, '..', 'dist'));
  app.setBaseViewsDir(resolve(__dirname, '..', 'dist'));
  app.setViewEngine('hbs');

  await app.listen(PORT || 3000);
}

bootstrap();
