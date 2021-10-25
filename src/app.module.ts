import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContextModule } from './context/context.module';
import { DatabaseModule } from './ioc/database.module';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    TodoModule,
    AuthModule,
    ContextModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppService],
  exports: [ContextModule],
})
export class AppModule {}
