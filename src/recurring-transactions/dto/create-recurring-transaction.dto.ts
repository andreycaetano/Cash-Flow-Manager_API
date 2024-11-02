import { IsDate, IsEnum, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateRecurringTransactionDto {
    @IsString()
    transactionName: string;

    @IsNumber({ allowNaN: false }, { message: 'The value must be a number.' })
    @Max(9999999999.99, { message: 'The value cannot be greater than 9999999999.99.'})
    @Min(0, { message: 'The value cannot be negative.'})
    amount: number;

    @IsEnum(['daily', 'weekly', 'monthly', 'yearly'], { message: 'Frequency must be either daily, weekly, monthly or yearly'})
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';

    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;
}
