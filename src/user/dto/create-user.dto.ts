import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
      example: 'John'
    })
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    fName: string;

    @ApiProperty({
      example: 'Doe'
    })
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    lName: string;

    @ApiProperty({
      example: 'john@mail.com'
    })
    @IsEmail()
    @MaxLength(255)
    email: string;

    @ApiProperty({
      example: 'Password12@'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'password too weak',
    })
    password: string;

    @ApiProperty({
      example: 'user'
    })
    @IsOptional()
    @IsEnum(['user', 'admin'], { message: 'Role must be either Admin or User'})
    role: 'user' | 'admin';
}
