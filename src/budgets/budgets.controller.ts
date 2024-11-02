import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './guards/ownership.guard';
import { OwnershipCategoryGuard } from 'src/expenses/guards/ownership-category.guard';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post(':categoryId')
  @UseGuards(AuthGuard('jwt'), OwnershipCategoryGuard)
  create(
    @Param('categoryId') categoryId: string,
    @Body() createBudgetDto: CreateBudgetDto
  ) {
    return this.budgetsService.create(categoryId, createBudgetDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @CurrentUser() user: User
  ) {
    return this.budgetsService.findAll(user.id);
  }

  @Get(':budgetId')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  findOne(@Param('budgetId') budgetId: string) {
    return this.budgetsService.findOne(budgetId);
  }

  @Patch(':budgetId')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  update(
    @CurrentUser() user: User,
    @Param('budgetId') budgetId: string,
    @Body() updateBudgetDto: UpdateBudgetDto
  ) {
    return this.budgetsService.update(budgetId, user.id, updateBudgetDto);
  }

  @Delete(':budgetId')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  remove(@Param('budgetId') budgetId: string) {
    return this.budgetsService.remove(budgetId);
  }
}
