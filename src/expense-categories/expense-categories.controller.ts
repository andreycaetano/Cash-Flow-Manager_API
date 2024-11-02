import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './guards/ownership.guard';
import { ApiCreateExpenseCategory, ApiDeleteExpenseCategory, ApiExpenseCategories, ApiExpenseCategory, ApiUpdateExpenseCategory } from './decorators/swagger.decorator';

@ApiTags('User: Expense Categories')
@Controller('user/expense-categories')
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreateExpenseCategory()
  create(
    @CurrentUser() user: User,
    @Body() createExpenseCategoryDto: CreateExpenseCategoryDto
  ) {
    return this.expenseCategoriesService.create(user.id ,createExpenseCategoryDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiExpenseCategories()
  findAll(
    @CurrentUser() user: User
  ) {
    return this.expenseCategoriesService.findAll(user.id);
  }

  @Get(':id')
  @ApiExpenseCategory()
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  findOne(@Param('id') id: string) {
    return this.expenseCategoriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @ApiUpdateExpenseCategory()
  update(@Param('id') id: string, @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return this.expenseCategoriesService.update(id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  @ApiDeleteExpenseCategory()
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.expenseCategoriesService.remove(id);
  }
}
