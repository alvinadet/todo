import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection, ConnectionManager } from 'typeorm';

const { DB_SERVER, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

@Injectable()
export class DbConnectionManager {
  private _connection?: Connection;
  public currentConnectionName?: string;

  constructor(
    @Inject(ConnectionManager) private connectionManager: ConnectionManager,
  ) {}

  setCurrentConnection(name?: string) {
    if (!name || !name.trim()) {
      name = undefined;
    }

    this._connection = this.connectionManager.get(name);
    this.currentConnectionName = name;
  }

  setManager(manager?: Connection) {
    this._connection = manager;
  }

  connection(): Connection {
    return (
      this._connection || (this._connection = this.connectionManager.get())
    );
  }

  static databaseConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: DB_SERVER,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: false,
      migrationsTableName: 'migration',
      migrations: [__dirname + 'migrations/*.ts'],
      logging: ['error'],
      logger: 'file',
    };
  }
}

export interface IDbConnectionManager extends DbConnectionManager {}
