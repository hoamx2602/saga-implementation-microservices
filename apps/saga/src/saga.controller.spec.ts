import { Test, TestingModule } from '@nestjs/testing';
import { SagaController } from './saga.controller';
import { SagaService } from './saga.service';

describe('SagaController', () => {
  let appController: SagaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SagaController],
      providers: [SagaService],
    }).compile();

    appController = app.get<SagaController>(SagaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
