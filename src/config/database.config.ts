import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_SERVER, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const databaseConfig: TypeOrmModuleOptions = {
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
};
