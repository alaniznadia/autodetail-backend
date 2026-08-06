import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'node:path';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

export default registerAs('database', (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: required('DB_HOST'),
  port: Number(process.env.DB_PORT ?? 5432),
  username: required('DB_USERNAME'),
  password: required('DB_PASSWORD'),
  database: required('DB_NAME'),
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  migrationsTableName: 'typeorm_migrations',
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  logging: process.env.DB_LOGGING === 'true' ? ['error', 'warn', 'migration'] : ['error'],
  extra: { max: Number(process.env.DB_POOL_MAX ?? 10), idleTimeoutMillis: 30000, connectionTimeoutMillis: 5000 },
}));
