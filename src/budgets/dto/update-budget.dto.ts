import { PartialType } from '@nestjs/swagger';
import { CreateBudgetDto } from './create-budget.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
    @IsOptional()
    @IsString()
    categoryId: string;
}
