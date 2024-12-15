import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mssql', // Specify MSSQL as the database type
  host: 'localhost', // Your SQL Server host
  port: 1433, // Default port for MSSQL
  username: '', // Replace with your SQL Server username
  password: '', // Replace with your password
  database: 'nestjs', // Replace with your database name
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Set to false in production
  options: {
    encrypt: false, // Disable encryption for development; set to true in production
    trustServerCertificate: true, // Necessary for self-signed certificates
  },
  logging: true, // Log SQL queries to the console
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => databaseConfig);

export const datasource = new DataSource(databaseConfig as DataSourceOptions);
