import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { json } from 'body-parser';
import helmet from 'helmet';
import express from 'express';
import http from 'http';
import https from 'https';
import appRoot from 'app-root-path';
import expressSession from 'express-session';
import { resolve } from 'path';
import { AppModule } from './app.module';
import MongoStore from 'connect-mongo';
import { readFileSync } from 'fs';

const appRootPath = appRoot.toString();
const {
  PORT,
  HTTPS_PORT,
  DATABASE_URL,
  CERT_PATH,
  PRIVATE_KEY_PATH,
} = process.env;
const certPathSegmented = CERT_PATH.split('/');
const privateKeyPathSegmented = PRIVATE_KEY_PATH.split('/');
const privateKeyPath = resolve(appRootPath, ...privateKeyPathSegmented);
const certPath = resolve(appRootPath, ...certPathSegmented);
const mongoStore = MongoStore.create({ mongoUrl: DATABASE_URL });

export async function bootstrap(): Promise<void> {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );
  const httpsOptions = {
    key: readFileSync(privateKeyPath, 'utf8'),
    cert: readFileSync(certPath, 'utf8'),
  };

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
  app.useStaticAssets(resolve(__dirname, '..', 'dist'));
  app.setBaseViewsDir(resolve(__dirname, '..', 'dist'));
  app.setViewEngine('hbs');

  await app.init();

  http.createServer(server).listen(PORT);
  https.createServer(httpsOptions, server).listen(HTTPS_PORT);
}

bootstrap();
