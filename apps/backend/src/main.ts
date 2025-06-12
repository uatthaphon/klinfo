import { ConfigService } from '@nestjs/config';
import cors, { FastifyCorsOptions } from '@fastify/cors';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = app.get(ConfigService);

  // ✅ Explicitly cast cors plugin to expected type
  await app.register(
    cors as any as (
      instance: any,
      opts: FastifyCorsOptions,
      done: () => void,
    ) => void,
    {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'x-org',
        'x-alias',
        'authorization',
        'cache-control',
      ],
    },
  );

  const port = config.get<number>('APP_PORT') || 3000;
  const host = config.get<string>('APP_HOST') || '0.0.0.0';
  await app.listen(port, host);
}
bootstrap();
