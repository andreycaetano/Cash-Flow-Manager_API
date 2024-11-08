import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'Mike',
  })
  fName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
  })
  lName?: string;

  @ApiPropertyOptional({
    example: 'mike@mail.com',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Password123@',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'user',
  })
  @IsOptional()
  role?: 'user' | 'admin';
}
