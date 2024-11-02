import { PartialType } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
    @IsNumber({ allowNaN: false }, { message: 'The value must be a number.' })
    @Max(9999999999.99, { message: 'The value cannot be greater than 9999999999.99.'})
    @Min(0, { message: 'The value cannot be negative.'})
    amount: number;

    @IsString()
    description: string;

    @IsDate()
    date: Date;

    @IsOptional()
    @IsString()
    categoryId: string;
}
