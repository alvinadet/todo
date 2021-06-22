import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { TodoDto } from './todo.interface';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll(): Promise<TodoDto[]> {
    const res = await this.todoRepository.find();
    return res.map((e) => ({ id: e.id, todo: e.name }));
  }

  async get(id: string): Promise<TodoEntity> {
    const res = await this.todoRepository.findOne(id);

    return {
      id: res.id,
      name: res.name,
    };
  }
}
