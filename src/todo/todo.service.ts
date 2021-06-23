import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { TodoCreateDto, TodoDto, TodoUpdateDto } from './todo.interface';
import { TodoMapper } from './todo.mapper';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async list(): Promise<TodoDto[]> {
    const res = await this.todoRepository.find();
    return res.map((e) => TodoMapper.mapEntityToDto(e));
  }

  async get(id: string): Promise<TodoDto> {
    const res = await this.todoRepository.findOne(id);

    return TodoMapper.mapEntityToDto(res);
  }

  async create(data: TodoCreateDto): Promise<TodoDto> {
    const createdData = this.todoRepository.create(
      TodoMapper.mapDtoToEntity(data),
    );

    const res = await this.todoRepository.save(createdData);

    return TodoMapper.mapEntityToDto(res);
  }

  async update(data: TodoUpdateDto): Promise<TodoDto> {
    const res = await this.todoRepository.save(TodoMapper.mapDtoToEntity(data));
    return TodoMapper.mapEntityToDto(res);
  }

  async delete(id: string): Promise<string> {
    await this.todoRepository.delete({ id });
    return id;
  }
}
