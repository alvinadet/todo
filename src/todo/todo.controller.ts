import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TodoCreateDto, TodoDto, TodoUpdateDto } from './todo.interface';
import { TodoService } from './todo.service';

@UseGuards(JwtAuthGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async index(): Promise<TodoDto[]> {
    return this.todoService.list();
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<TodoUpdateDto> {
    return await this.todoService.get(id);
  }

  @Post()
  async create(@Body() data: TodoCreateDto): Promise<TodoDto> {
    return this.todoService.create(data);
  }

  @Put()
  async update(@Body() data: TodoUpdateDto): Promise<TodoDto> {
    return this.todoService.update(data);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return this.todoService.delete(id);
  }
}
