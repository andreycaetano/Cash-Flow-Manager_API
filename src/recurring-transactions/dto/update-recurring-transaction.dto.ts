import { PartialType } from '@nestjs/swagger';
import { CreateRecurringTransactionDto } from './create-recurring-transaction.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRecurringTransactionDto extends PartialType(CreateRecurringTransactionDto) {
    @IsOptional()
    @IsString()
    categoryId: string;
}
