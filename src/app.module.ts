import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './ioc/database.module';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    DatabaseModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService, TodoService],
})
export class AppModule {}
