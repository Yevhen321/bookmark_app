// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const module: any;

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as express from 'express';
import { join } from 'path';

import { AppModule } from './app.module';

const port = 4000;

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
      }),
   );

   await app.listen(port);

   if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
   }
}

bootstrap();
