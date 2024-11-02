import { forwardRef, Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { UserModule } from '../user/user.module';
import { ExpenseCategoriesModule } from '../expense-categories/expense-categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    forwardRef(() => UserModule),
    ExpenseCategoriesModule
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})

export class ExpensesModule {}
