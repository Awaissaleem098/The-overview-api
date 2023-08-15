import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import debug from 'debug';
import { json, urlencoded } from 'express';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const logger = new Logger('main');
  if (debug.enabled('mongoose')) {
    mongoose.set('debug', true);
  }
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '10mb' })); // Max of incoming request payload in Json format. For image in tutorial reasons.
  app.use(urlencoded({ limit: '10mb', extended: true })); // Max of incoming request payload in URL-encoded format. For image in tutorial reasons.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}

bootstrap().then(() => {
  logger.debug('Debug log message');
});
