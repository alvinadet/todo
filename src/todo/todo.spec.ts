import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('Todo', () => {
  let provider: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    provider = module.get(TodoService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
