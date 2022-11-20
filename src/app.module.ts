import { EventsModule } from './transaction/events/events.module';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TransactionModule, ScheduleModule.forRoot(), EventsModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
