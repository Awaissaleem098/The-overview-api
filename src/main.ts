import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import debug from 'debug';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const logger = new Logger('main');
  if (debug.enabled('mongoose')) {
    mongoose.set('debug', true);
  }
  const app = await NestFactory.create(AppModule);
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
