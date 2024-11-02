import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserPreferenceDto {
    @ApiProperty({
        example: 'R$'
    })
    @IsString()
    defaultCurrency: string;

    @ApiProperty({
        example: 'pt-BR'
    })
    @IsString()
    language: string;
}
