import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseModelSubscriber } from './base-model.subscriber';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, BaseModelSubscriber],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_SERVER'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
          migrationsTableName: 'migration',
          migrations: [__dirname + 'migrations/*.ts'],
          logging: ['error'],
          logger: 'file',
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [BaseModelSubscriber],
  exports: [BaseModelSubscriber],
})
export class DatabaseModule {}
