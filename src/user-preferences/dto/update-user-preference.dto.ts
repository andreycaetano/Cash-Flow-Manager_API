import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserPreferenceDto } from './create-user-preference.dto';

export class UpdateUserPreferenceDto extends PartialType(CreateUserPreferenceDto) {
    @ApiProperty({
        example: 'US$'
    })
    @IsString()
    defaultCurrency: string;

    @ApiProperty({
        example: 'pt-BR'
    })
    @IsString()
    language: string;
}
