import { forwardRef, Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './entities/budget.entity';
import { ExpenseCategoriesModule } from 'src/expense-categories/expense-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget]),
    forwardRef(() => UserModule),
    ExpenseCategoriesModule   
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetsModule {}
