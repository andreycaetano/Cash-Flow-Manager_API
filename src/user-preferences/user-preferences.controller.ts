import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { AuthGuard } from '@nestjs/passport';
import { OwnershipGuard } from './guards/ownership.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ApiCreatePreference, ApiDeletePreference, ApiMultiplePreference, ApiPreference, ApiUpdatePreference } from './decorators/swagger.decorator';

@ApiTags('User: Preferences')
@Controller('user/preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatePreference()
  create(
    @CurrentUser() user: User,
    @Body() createUserPreferenceDto: CreateUserPreferenceDto
  ) {
    return this.userPreferencesService.create(user.id, createUserPreferenceDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiMultiplePreference()
  findAll(
    @CurrentUser() user: User,
  ) {
    return this.userPreferencesService.findAll(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  @ApiPreference()
  findOne(@Param('id') id: string) {
    return this.userPreferencesService.findOne(id);
  }

  @Patch(':id')
  @ApiUpdatePreference()
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  update(@Param('id') id: string, @Body() updateUserPreferenceDto: UpdateUserPreferenceDto) {
    return this.userPreferencesService.update(id, updateUserPreferenceDto);
  }

  @Delete(':id')
  @ApiDeletePreference()
  @UseGuards(AuthGuard('jwt'), OwnershipGuard)
  remove(@Param('id') id: string) {
    return this.userPreferencesService.remove(id);
  }
}
