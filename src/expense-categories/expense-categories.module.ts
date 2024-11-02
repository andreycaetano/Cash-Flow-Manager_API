import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { ExpenseCategory } from './entities/expense-category.entity';
import { ExpenseCategoriesController } from './expense-categories.controller';
import { ExpenseCategoriesService } from './expense-categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseCategory]) ,forwardRef(() => UserModule)],
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService],
  exports: [ExpenseCategoriesService]
})
export class ExpenseCategoriesModule {}
