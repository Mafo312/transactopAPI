import { TransactionService } from './transaction/transaction.service';
import { TransactionController } from './transaction/transaction.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('AppController', () => {
  let appController: TransactionController;

  const mockTransactionService = {}

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({

      controllers: [TransactionController],
      providers: [TransactionService],
    })
    .overrideProvider(TransactionService)
    .useValue(mockTransactionService)
    .compile();

    appController = app.get<TransactionController>(TransactionController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  })

});
