import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { instance } from './common/utils/witson.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips out properties that are not in the DTO
      forbidNonWhitelisted: true, // Throws an error if extra properties are sent
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Automatically type-cast primitives (string to number, etc.)
      },
    }),
  );

  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });
  app.setGlobalPrefix('v1');

  await app.listen(3000);
}
bootstrap();
