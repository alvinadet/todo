import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ContextModule } from './context/context.module';
import { BaseModelSubscriber } from './ioc/base-model.subscriber';
import { DatabaseModule } from './ioc/database.module';
import { DbConnectionManager } from './ioc/db-connection-manager';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, BaseModelSubscriber],
      useFactory: () => {
        return {
          ...DbConnectionManager.databaseConfig(),
        };
      },
      inject: [ConfigService],
    }),

    UserModule,
    TodoModule,
    AuthModule,
    ContextModule,
    DatabaseModule,
  ],
  providers: [AppService],
  exports: [ContextModule],
})
export class AppModule {}
