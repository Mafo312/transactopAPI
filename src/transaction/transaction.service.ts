
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction } from './entities/transaction.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { faker } from '@faker-js/faker';
import sequelize from 'sequelize';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})

@Injectable()
export class TransactionService {
  
  @WebSocketServer()
  server: Server;

   /** inject repository in contructor */
   constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: typeof Transaction,
  ){}

  private readonly logger = new Logger(TransactionService.name);

  /******************************************* Crate transaction by dto **************************************/

  
  create(createTransactionDto: CreateTransactionDto){
    
      const firstRandom = faker.datatype.number(123456789);

      const transaction = this.transactionRepository.create({
        value: createTransactionDto.value, 
        timestamp: createTransactionDto.timestamp,
        receiver: createTransactionDto.receiver,
        confirmed: createTransactionDto.confirmed,
        sender: createTransactionDto.sender,
        
      })
      
      if (!transaction){
        return 'Error'
      }
    return transaction
  }

  /******************************************* Create transaction by socket ******************************************* */

  @Cron('59 * * * * *')
  createByTachCron(){
    
      const firstRandom = faker.datatype.number(123456789);

      const transaction = this.transactionRepository.create({
        value: firstRandom, 
        timestamp: Math.floor(Date.now()/1000),
        receiver: faker.internet.userName(),
        confirmed: false,
        sender: faker.internet.userName(),
      })
      
      if (!transaction){
        return 'Error'
      }
    return transaction
  }

  /********************************************** Get all transaction and connect by socket ***************************/ 

  @Cron(CronExpression.EVERY_10_SECONDS)
  @SubscribeMessage('eventsss')
  async findAll(): Promise<any> {
      return {event: "eventsss", data: await this.transactionRepository.findAll({  order: [[sequelize.literal('"id"'), 'DESC']]})}
    }

  /********************************************** Find transaction by id **********************************************/

  findOne(id: number): Promise<Transaction> {
    return this.transactionRepository.findOne({where: {id: id}})
  }

  /*********************************************** Update transaction *************************************************/

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = this.transactionRepository.update({confirmed: updateTransactionDto.confirmed}, {where:{id: id}})

    return `This action updates a #${id} transaction`;
  }

  /*********************************************** Remove transaction ***********************************************/

  remove(id: number) {
    const transaction = this.transactionRepository.findOne({where: {id: id}})

    if (!transaction){
        return 'This transaction not found'
    }
    this.transactionRepository.destroy({where: {id: id}})
    return `This action removes a transaction`;
  }
}


















