import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'database/database.module';
import { transactiobProviders } from './transaction.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TransactionController],
  providers: [TransactionService,
              ...transactiobProviders
  ]
})
export class TransactionModule {}
