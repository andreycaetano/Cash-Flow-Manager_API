import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginRequestBody {
    @ApiProperty({
        example: 'john@mail.com'
    })
    @IsEmail({}, { message: 'Invalid email format.'})
    @MaxLength(255)
    email: string;


    @ApiProperty({
        example: 'Password12@'
    })
    @IsNotEmpty({ message: 'password is required'})
    @IsString()
    @MaxLength(20, { message: 'The provided lName exceeds the allowed character limit.'})
    @MinLength(6, {message: 'The password provided does not contain the minimum number of characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password provided does not meet the complexity requirements. Please choose a stronger password.',
    })
    password: string;
}