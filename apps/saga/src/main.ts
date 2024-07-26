import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SagaModule } from './saga.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(SagaModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: configService.get<string>('KAFKA_BROKER').split(','),
      },
      consumer: {
        groupId: 'saga-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT'));
  console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
