import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { ExpenseCategoriesService } from 'src/expense-categories/expense-categories.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetsService {
  constructor (
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
    private readonly categorySerivce: ExpenseCategoriesService
  ) {};

  async create(categoryId: string, createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const category = await this.categorySerivce.findOne(categoryId)
    const existingBudget = await this.budgetRepository.findOne({
      where: {
        category: { id: categoryId},
        status: 'active'
      },
      relations: ['category']
    });

    if(existingBudget) {
      throw new ConflictException('There is already a budget active for this category')
    };

    const budget = this.budgetRepository.create({
      ...createBudgetDto,
      category: category
    });

    return await this.budgetRepository.save(budget);
  }

  async findAll(userId: string): Promise<Budget[]> {
    const categories = await this.budgetRepository.find({
      relations: ['category'],
      where: {
        category: {  user: { id: userId}}
      }
    });
    return categories;
  }

  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id }
    });

    if (!budget) {
      throw new NotFoundException('Budget not found')
    }

    return budget;
  }

  async update(id: string, userId: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.findOne(id);

    const {categoryId, ...update} = updateBudgetDto

    if (updateBudgetDto.categoryId) {
      const category = await this.categorySerivce.findOne(updateBudgetDto.categoryId);
      if (category.user.id !== userId) {
        throw new ForbiddenException('you are not allowed to add quotes to this category')
      }

      budget.category = category
    }

    Object.assign(budget, update);

    return await this.budgetRepository.save(budget);
  }

  async remove(id: string): Promise<void> {
    const budget = await this.findOne(id);
    await this.budgetRepository.remove(budget)
  }
}
