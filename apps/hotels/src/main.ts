import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { HotelsModule } from './hotels.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(HotelsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: configService.get<string>('KAFKA_BROKER').split(','),
      },
      consumer: {
        groupId: 'hotels-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT'));
  console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
