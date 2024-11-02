import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'John',
  })
  fName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
  })
  lName?: string;

  @ApiPropertyOptional({
    example: 'john@mail.com',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Password123@',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'user',
  })
  role: 'user' | 'admin';
}
