import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginRequestBody {
    @ApiProperty({
        example: 'john@mail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Password12@'
    })
    @IsString()
    password: string
}