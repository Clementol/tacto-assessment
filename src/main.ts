import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      json: true, colors: true, logLevels: ['log', 'error'],
    })
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
