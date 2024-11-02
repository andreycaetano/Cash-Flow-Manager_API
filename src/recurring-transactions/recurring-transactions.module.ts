import { forwardRef, Module } from '@nestjs/common';
import { RecurringTransactionsService } from './recurring-transactions.service';
import { RecurringTransactionsController } from './recurring-transactions.controller';
import { UserModule } from 'src/user/user.module';
import { ExpenseCategoriesModule } from 'src/expense-categories/expense-categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecurringTransaction } from './entities/recurring-transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecurringTransaction]),
    forwardRef(() => UserModule),
    ExpenseCategoriesModule
  ],
  controllers: [RecurringTransactionsController],
  providers: [RecurringTransactionsService],
})
export class RecurringTransactionsModule {}
