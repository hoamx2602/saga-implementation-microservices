import { Module } from '@nestjs/common';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

@Module({
  imports: [],
  controllers: [SagaController],
  providers: [SagaService],
})
export class AppModule {}
