import { TransactionModule } from './../src/transaction/transaction.module';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('TransactionController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/all (GET)', () => {
    return request(app.getHttpServer()).get('/all').expect(200)
  })
});
