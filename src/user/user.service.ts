import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {};
  async save (user: User): Promise<User> {
    const savedUser = await this.userRepository.save(user);

    return {
      ...savedUser,
      password: undefined
    };
  };

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    return await this.save(user);
  };

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find() ;
    return users.map((user: User) => {
      return {
        ...user,
        password: undefined
      };
    });
  };

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    if(!user) {
      throw new NotFoundException('User not found')
    };
    return user;
  };

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const findUser = await this.findOne(id);
    Object.assign(findUser, updateUserDto);

    return await this.save(findUser);
  };

  async remove(id: string): Promise<void> {
    const findUser = await this.findOne(id);
    await this.userRepository.remove(findUser);
  };

  async findByEmail (email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email }});

    if (!user) throw new NotFoundException('User not found')

    return user;
  };
};