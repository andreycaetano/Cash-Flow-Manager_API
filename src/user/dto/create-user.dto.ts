import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
      example: 'John'
    })
    @IsNotEmpty({ message: 'fName is required'})
    @IsString()
    @MaxLength(50, { message: 'The provided fName exceeds the allowed character limit.'})
    @MinLength(3, { message: 'The fName provided does not contain the minimum number of characters'})
    fName: string;

    @ApiProperty({
      example: 'Doe'
    })
    @IsString()
    @MaxLength(50, {message: 'The provided lName exceeds the allowed character limit.'})
    @MinLength(3, { message: 'The lName provided does not contain the minimum number of characters'})
    lName: string;

    @ApiProperty({
      example: 'john@mail.com'
    })
    @IsEmail({}, { message: 'Invalid email format.'})
    @MaxLength(255)
    email: string;

    @ApiProperty({
      example: 'Password12@'
    })
    @IsString()
    @MaxLength(20, { message: 'The provided lName exceeds the allowed character limit.'})
    @MinLength(6, {message: 'The password provided does not contain the minimum number of characters'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'The password provided does not meet the complexity requirements. Please choose a stronger password.',
    })
    password: string;

    @ApiProperty({
      example: 'user'
    })
    @IsOptional()
    @IsEnum(['user', 'admin'], { message: 'Role must be either admin or user'})
    role: 'user' | 'admin';
}
