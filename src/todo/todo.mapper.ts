import { TodoEntity } from './todo.entity';
import { TodoDto, TodoUpdateDto } from './todo.interface';

export class TodoMapper {
  static mapEntityToDto(e: TodoEntity): TodoDto {
    return {
      id: e.id,
      name: e.name,
    };
  }

  static mapDtoToEntity(d: Partial<TodoUpdateDto>): Partial<TodoEntity> {
    return {
      id: d.id,
      name: d.name,
    };
  }
}
