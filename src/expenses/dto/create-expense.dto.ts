import { IsDate, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateExpenseDto {
    @IsNumber({ allowNaN: false }, { message: 'The value must be a number.' })
    @Max(9999999999.99, { message: 'The value cannot be greater than 9999999999.99.'})
    @Min(0, { message: 'The value cannot be negative.'})
    amount: number;

    @IsString()
    description: string;

    @IsDate()
    date: Date;
}
