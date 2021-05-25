import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import helmet from 'helmet';
import expressSession from 'express-session';
import { resolve } from 'path';
import { AppModule } from './app.module';
import MongoStore from 'connect-mongo';

const { PORT, DATABASE_URL } = process.env;
const mongoStore = MongoStore.create({ mongoUrl: DATABASE_URL });

export async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.use(json());
  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.MODE === 'production' },
      store: mongoStore,
    }),
  );
  app.useStaticAssets(resolve(__dirname, '..', '..', 'dist'));
  app.setBaseViewsDir(resolve(__dirname, '..', '..', 'dist'));
  app.setViewEngine('hbs');

  await app.listen(PORT || 3000);
}

if (process.env.MODE === 'development') {
  bootstrap();
}
