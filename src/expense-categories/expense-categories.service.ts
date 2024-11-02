import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ExpenseCategory } from './entities/expense-category.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class ExpenseCategoriesService {
  constructor(
    @InjectRepository(ExpenseCategory)
    private readonly categoryRepository: Repository<ExpenseCategory>,
    private readonly userService: UserService
  ) {};

  async create(userId: string, createExpenseCategoryDto: CreateExpenseCategoryDto): Promise<ExpenseCategory> {
    const user = await this.userService.findOne(userId);
    const expenseCategory = this.categoryRepository.create(createExpenseCategoryDto);
    expenseCategory.user = user;

    return await this.categoryRepository.save(expenseCategory);
  }

  async findAll(userId: string): Promise<ExpenseCategory[]> {
    const user = await this.userService.findOne(userId);

    const categories = await this.categoryRepository.find({ 
      where: { 
        user 
      }, 
      relations: [
        'expenses',
      ],
      order: {
        name: 'ASC',
        expense: { date: 'ASC'}
      }
    });

    return categories;
  }

  async findOne(id: string): Promise<ExpenseCategory> {
    const category = await this.categoryRepository.findOne({ where: { id }, relations: ['user', 'budget']})
    if (!category) throw new NotFoundException('Expense category not found');

    return category;
  }

  async update(id: string, updateExpenseCategoryDto: UpdateExpenseCategoryDto): Promise<ExpenseCategory> {
   const category = await this.findOne(id);
   Object.assign(category, updateExpenseCategoryDto);

   return await this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
