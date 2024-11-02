import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { ExpenseCategoriesService } from '../expense-categories/expense-categories.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
    private readonly categoryService: ExpenseCategoriesService
  ) {};

  async create(categoryId: string, createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const category = await this.categoryService.findOne(categoryId);

    const expense = this.expenseRepository.create(createExpenseDto);
    expense.category = category;

    return await this.expenseRepository.save(expense);
  }

  async findAll(userId: string): Promise<Expense[]> {
    const categories = await this.categoryService.findAll(userId);

    return categories.flatMap((category) => category.expense)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseRepository.findOne({ where: { id }, relations: ['category']});
    if (!expense) {
      throw new NotFoundException('Expense not found')
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const expense = await this.findOne(id);

    if (updateExpenseDto.categoryId) {
      const category = await this.categoryService.findOne(updateExpenseDto.categoryId);
      expense.category = category
    }

    const {categoryId, ...update} = updateExpenseDto;

    Object.assign(expense, update);

    return await this.expenseRepository.save(expense);
  }

  async remove(id: string): Promise<void> {
    const expense = await this.findOne(id);
    await this.expenseRepository.remove(expense);
  }
}
