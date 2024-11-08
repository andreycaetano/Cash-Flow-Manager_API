import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPreference } from './entities/user-preference.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectRepository(UserPreference)
    private readonly preferenceRepository: Repository<UserPreference>,
    private readonly userService: UserService
  ) {};

  async create(userId: string, createUserPreferenceDto: CreateUserPreferenceDto): Promise<UserPreference> {
    const findUser = await this.userService.findOne(userId);

    const existingPreference = await this.preferenceRepository.findOne({ where: { user: { id: userId }}})
    if (existingPreference) {
      throw new ConflictException('You already have a preference set. Only one preference is allowed per user.')
    }

    const preference = this.preferenceRepository.create({...createUserPreferenceDto, user: findUser});
    
    const newPreference = await this.preferenceRepository.save(preference)
    return {
      ...newPreference,
      user: undefined
    };
  };

  async findAll(userId: string): Promise<UserPreference[]> {
    const user = await this.userService.findOne(userId);

    return await this.preferenceRepository.find({ where: { user }});
  }

  async findOne(id: string): Promise<UserPreference> {
    const preference =  await this.preferenceRepository.findOne({ where: { id }, relations: ['user']});
    if (!preference) throw new NotFoundException('Preference not found');
    return preference;
  }

  async update(id: string, updateUserPreferenceDto: UpdateUserPreferenceDto): Promise<UserPreference> {
    const preference = await this.findOne(id);
    Object.assign(preference, updateUserPreferenceDto);

    return await this.preferenceRepository.save(preference);
  }

  async remove(id: string): Promise<void> {
    const preference = await this.findOne(id);
    await this.preferenceRepository.remove(preference);
  }

  async find(id: string): Promise<UserPreference> {
    const preference =  await this.preferenceRepository.findOne({ where: { id }});
    if (!preference) throw new NotFoundException('Preference not found');
  
    return preference;
  }
}
