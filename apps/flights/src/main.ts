import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { FlightsModule } from './flights.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(FlightsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: configService.get<string>('KAFKA_BROKER').split(','),
      },
      consumer: {
        groupId: 'flights-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('PORT'));
  console.log(`Application running at ${await app.getUrl()}`);
}
bootstrap();
