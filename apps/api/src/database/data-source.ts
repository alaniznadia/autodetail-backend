import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'node:path';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'autodetail',
  password: process.env.DB_PASSWORD ?? 'autodetail_dev',
  database: process.env.DB_NAME ?? 'autodetail',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  entities: [join(__dirname, 'entities/*{.ts,.js}')],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  migrationsTableName: 'typeorm_migrations',
  synchronize: false,
};

export const AppDataSource = new DataSource(options);
export default AppDataSource;
