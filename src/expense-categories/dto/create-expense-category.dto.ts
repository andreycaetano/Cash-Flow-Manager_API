import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateExpenseCategoryDto {
    @ApiProperty({
        example: 'Transportation'
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Expenses related to travel and transportation'
    })
    @IsString()
    description: string;
};
