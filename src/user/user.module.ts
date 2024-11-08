import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetsModule } from 'src/budgets/budgets.module';
import { RecurringTransactionsModule } from 'src/recurring-transactions/recurring-transactions.module';
import { ExpenseCategoriesModule } from '../expense-categories/expense-categories.module';
import { ExpensesModule } from '../expenses/expenses.module';
import { UserPreferencesModule } from '../user-preferences/user-preferences.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    forwardRef(() => UserPreferencesModule), 
    forwardRef(() => ExpenseCategoriesModule), 
    forwardRef(() => ExpensesModule),
    forwardRef(() => BudgetsModule),
    forwardRef(() => RecurringTransactionsModule)
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports: [UserService]
})
export class UserModule {}
