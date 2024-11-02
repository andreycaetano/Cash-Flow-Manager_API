import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { OwnershipCategoryGuard } from './guards/ownership-category.guard';
import { OwnershipExpenseGuard } from './guards/ownership-expense.guard';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post(':categoryId')
  @UseGuards(AuthGuard('jwt'), OwnershipCategoryGuard)
  create(
    @Param('categoryId') categoryId: string,
    @Body() createExpenseDto: CreateExpenseDto
  ) {
    return this.expensesService.create(categoryId, createExpenseDto);
  }

  @Get()
  @UseGuards(AuthGuard(`jwt`))
  findAll(
    @CurrentUser() user: User
  ) {
    return this.expensesService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard(`jwt`), OwnershipExpenseGuard)
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(`jwt`), OwnershipExpenseGuard)
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @UseGuards(AuthGuard(`jwt`), OwnershipExpenseGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
