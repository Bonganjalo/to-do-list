import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private userRepository: Repository<Task>,
    private usersService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const user: any = await this.usersService.findOneById(createTaskDto.userId);
    if (!user) {
      throw new NotFoundException(`User ${createTaskDto.userId} is not found`);
    }
    console.log(user);
    return await this.userRepository.save({ ...createTaskDto, ...{ user } });
  }

  async findAll(): Promise<Task[]> {
    return await this.userRepository.find({ relations: { user: true } });
  }

  async findOneById(id: string): Promise<Task> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAllWithUser(): Promise<Task[]> {
    return await this.userRepository.find({ relations: { user: true } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const user: any = await this.usersService.findOneById(updateTaskDto.userId);
    if (!user) {
      throw new NotFoundException(`User ${updateTaskDto.userId} is not found`);
    }
    return await this.userRepository.update(id, {
      ...{
        user,
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        status: updateTaskDto.status,
      },
    });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
