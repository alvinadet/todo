import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { TodoCreateDto, TodoDto } from './todo.interface';
import { TodoMapper } from './todo.mapper';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoDto[]> {
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
}
