import { Connection } from 'typeorm';
import { TodoEntity } from './todo.entity';

export const todoProviders = [
  {
    provide: 'TODO_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(TodoEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
