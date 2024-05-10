import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions } from '@nestjs/common/interfaces/nest-application-options.interface';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const options: NestApplicationOptions = {
  cors: true
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
