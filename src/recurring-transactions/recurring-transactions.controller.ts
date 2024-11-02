import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('recurring-transactions')
export class RecurringTransactionsController {
  constructor(private readonly recurringTransactionsService: RecurringTransactionsService) { }

  @Post(':categoryId')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Param('categoryId') categoryId: string,
    @Body() createRecurringTransactionDto: CreateRecurringTransactionDto
  ) {
    return this.recurringTransactionsService.create(categoryId, createRecurringTransactionDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @CurrentUser() user: User,
  ) {
    return this.recurringTransactionsService.findAll(user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':transactionId')
  findOne(@Param('transactionId') id: string) {
    return this.recurringTransactionsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':transactionId')
  update(
    @CurrentUser() user: User,
    @Param('transactionId') transactionId: string,
    @Body() updateRecurringTransactionDto: UpdateRecurringTransactionDto) {
    return this.recurringTransactionsService.update(transactionId, user.id, updateRecurringTransactionDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':transactionId')
  remove(@Param('transactionId') transactionId: string) {
    return this.recurringTransactionsService.remove(transactionId);
  }
}
