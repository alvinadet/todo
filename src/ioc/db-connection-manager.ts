import { Inject, Injectable } from '@nestjs/common';
import { Connection, ConnectionManager } from 'typeorm';

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
}

export interface IDbConnectionManager extends DbConnectionManager {}
