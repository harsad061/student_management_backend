import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // your React app URL
    credentials: true, // if you need cookies/auth
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove non-whitelisted props
      forbidNonWhitelisted: true, // throw error if extra props are sent
      forbidUnknownValues: true, // throw error on unknown values like null
      transform: true, // auto-transform payloads to DTO instances
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
