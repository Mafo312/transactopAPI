import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('api/v1/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

   /****************************** ******** Create transaction controller ******************* */
  @Post()
  @ApiOperation({ description: 'Crate transaction tracking' })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  /****************************** ******** Get all transaction controller ******************* */
  @Get('all')
  @ApiOperation({ description: 'Get all transactions' })
  findAll() {
    return this.transactionService.findAll();
  }

  /****************************** ******** Get one transaction controller ******************* */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }
  /****************************** ******** Update transaction controller ******************* */
  @Patch(':id')
  @ApiOperation({ description: 'Get one transaction by your id' })
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  /***************************************  Delete transaction controller *********************/
  @Delete(':id')
  @ApiOperation({ description: 'Delete one transaction' })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
