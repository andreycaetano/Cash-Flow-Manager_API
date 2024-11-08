import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { IsSelfGuard } from './guards/is-self.guard';
import { ApiCreateUser, ApiFindAllUsers, ApiFindOneUser, ApiUpdateUser, ApiDeleteUser } from './decorators/swagger.decorator';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from './guards/admin.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @IsPublic()
    @ApiCreateUser()
    create(@Body() createUserDto: CreateUserDto) {    
        return this.userService.create(createUserDto);
    }

    @Get()
    @IsPublic()
    @ApiFindAllUsers()
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), IsSelfGuard)
    @ApiFindOneUser()
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'), IsSelfGuard)
    @ApiUpdateUser()
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(AuthGuard('jwt'), IsSelfGuard)
    @ApiDeleteUser()
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
