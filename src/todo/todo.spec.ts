import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TodoService } from './todo.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

describe('Todo', () => {
  let provider: TodoService;
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    app = module.createNestApplication();
    await app.init();

    // provider = await app.resolve(TodoService);
  });

  afterAll(async (done) => {
    await app.close();
    done();
  });

  it('should be defined', (done) => {
    console.log(provider);
    expect(provider).toBeDefined();

    done();
  });
});
