import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecurringTransactionDto } from './dto/create-recurring-transaction.dto';
import { UpdateRecurringTransactionDto } from './dto/update-recurring-transaction.dto';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { RecurringTransaction } from './entities/recurring-transaction.entity';
import { Repository } from 'typeorm';
import { ExpenseCategoriesService } from 'src/expense-categories/expense-categories.service';

@Injectable()
export class RecurringTransactionsService {
  constructor(
    @InjectRepository(RecurringTransaction)
    private readonly transactionRepository: Repository<RecurringTransaction>,
    private readonly userService: UserService,
    private readonly categoryService: ExpenseCategoriesService
  ) {}

  async create(categoryId: string, createRecurringTransactionDto: CreateRecurringTransactionDto): Promise<RecurringTransaction> {
    const category = await this.categoryService.findOne(categoryId);
    const existingTransaction = await this.transactionRepository.findOne({
      where: {
        category: { id: category.id},
        transactionName: createRecurringTransactionDto.transactionName
      },
      relations: ['category']
    });

    if (existingTransaction) {
      throw new ConflictException('This user already has a recurring transaction with this name in this category');
    };

    const transaction = this.transactionRepository.create({
      ...createRecurringTransactionDto,
      category: category
    });

    return await this.transactionRepository.save(transaction);
  }

  async findAll(userId: string): Promise<RecurringTransaction[]> {
    return await this.transactionRepository.find({
      relations: ['category'],
      where: {
        category: {
          user: { id: userId}
        }
      }
    });
  };

  async findOne(transactionId: string): Promise<RecurringTransaction> {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: transactionId
      },
      relations: ['category']
    })

    if (!transaction) {
      throw new NotFoundException('Recurrent Transaction not found');
    };

    return transaction;
  }

  async update(transactionId: string, userId: string,updateRecurringTransactionDto: UpdateRecurringTransactionDto): Promise<RecurringTransaction> {
    const transaction = await this.findOne(transactionId);

    const {categoryId, ...update} = updateRecurringTransactionDto;

    if (updateRecurringTransactionDto.categoryId) {
      const category = await this.categoryService.findOne(updateRecurringTransactionDto.categoryId);
      if (category.user.id !== userId) {
        throw new ForbiddenException('you are not allowed to add quotes to this category')
      };
      transaction.category = category;
    }
    Object.assign(transaction, update);

    return await this.transactionRepository.save(transaction);
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.findOne(id)
    await this.transactionRepository.remove(transaction)
  }
}
