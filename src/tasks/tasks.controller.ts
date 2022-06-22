import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UnprocessableEntityException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTaskDto: CreateTaskDto) {
    console.log('DTO ', createTaskDto);
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOneById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const response = await this.tasksService.update(id, updateTaskDto);
    if (response && response.affected > 0) {
      return await this.tasksService.findOneById(id);
    }

    throw new UnprocessableEntityException('Failed to udpate task');
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
