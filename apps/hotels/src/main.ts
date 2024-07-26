import { NestFactory } from '@nestjs/core';
import { HotelsModule } from './hotels.module';

async function bootstrap() {
  const app = await NestFactory.create(HotelsModule);
  await app.listen(3000);
}
bootstrap();
