import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateExpenseCategoryDto } from './create-expense-category.dto';
import { IsString } from 'class-validator';

export class UpdateExpenseCategoryDto extends PartialType(CreateExpenseCategoryDto) {
    @ApiProperty({
        example: 'Transportation'
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Expenses related to travel and transportation, including public transport, fuel, and taxis.'
    })
    @IsString()
    description: string;
}
