// src/config/database.config.ts
import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env.local') });
export const databaseConfig = (configService?: ConfigService) => {
  const isRuntime = !!configService;

  const config: TypeOrmModuleOptions = {
    type: 'mssql', // Explicitly set to 'mssql'
    host: isRuntime
      ? configService.get('database.host')
      : process.env.HOST_NAME,
    port: isRuntime
      ? parseInt(configService.get('database.port'), 10)
      : parseInt(process.env.DB_PORT, 10),
    username: isRuntime
      ? configService.get('database.username')
      : process.env.DB_USERNAME,
    password: isRuntime
      ? configService.get('database.password')
      : process.env.DB_PASSWORD,
    database: isRuntime
      ? configService.get('database.db_name')
      : process.env.DB_NAME,
    entities: [
      path.join(__dirname, '../modules/**/entities/*.entity{.ts,.js}'),
    ],
    synchronize: true,
    options: {
      encrypt: isRuntime
        ? configService.get('database.DB_ENCRYPT', 'false') === 'true'
        : false,
      trustServerCertificate: isRuntime
        ? configService.get('database.DB_TRUST_CERTIFICATE', 'true') === 'true'
        : true,
    },
    logging: true,
    migrations: [path.join(__dirname, '../../migrations/*{.ts,.js}')],
  };
  return config;
};

export const datasource = new DataSource(databaseConfig() as DataSourceOptions);
