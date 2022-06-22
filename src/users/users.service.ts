import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create new user
  async create(createUserDto: CreateUserDto) {
    const user: User = await this.findOneByEmail(createUserDto.email);

    //Check if the email address exists
    if (user) {
      throw new UnprocessableEntityException('Email address is taken.');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    //Save user to the db
    return await this.userRepository.save({ ...createUserDto });
  }

  // Get all users and their tasks
  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: { tasks: true } });
  }

  // Get user
  async findOneById(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  // Get user and tasks
  async findOneByIdWithRelation(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: { tasks: true },
    });
  }

  // Get user by email address
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, { ...updateUserDto });
  }

  // Delete user
  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
