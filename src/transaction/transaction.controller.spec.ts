import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { faker } from '@faker-js/faker';

describe('AppController', () => {
  let transactionController: TransactionController;

  /*********************** Test mocker transaction service ************************* */

  const mockTransactionService = {
      create: jest.fn((dto) => {
          return {
            id: Date.now(),
            ...dto
          };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({
      id,
      ...dto
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({

      controllers: [TransactionController],
      providers: [TransactionService],
    })
    .overrideProvider(TransactionService)
    .useValue(mockTransactionService)
    .compile();

    transactionController = app.get<TransactionController>(TransactionController);
  });

  /*********************** Test if controller exist ************************* */

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
  })


  /*********************** Test create transaction ************************* */

  it('should create a transaction', () => {

    const firstRandom = faker.datatype.number(123456789);
    
    expect(transactionController.create({
        value: firstRandom, 
        timestamp: Math.floor(Date.now()/1000),
        receiver: faker.internet.userName(),
        confirmed: false,
        sender: faker.internet.userName(),
    }))

    expect(mockTransactionService.create).toHaveBeenCalled();
  })

  /*********************** Test update transaction ************************* */

  it('should update a transaction', () =>{
    const dto = {confirmed: true}

    expect(transactionController.update('1', dto)).toEqual({
      id: 1,
      ...dto
    })
  })
  

});
