import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(ApplicationModule, server);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
