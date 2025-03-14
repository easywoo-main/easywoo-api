import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export function databaseConfig(configService: ConfigService): DataSourceOptions {
  return {
    type: configService.get<any>('DATABASE_TYPE'),
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),

    synchronize: false,
    logging: false,

    entities: [__dirname + '/../**/*.entity.{ts,js}', __dirname + '/../entity/*.entity.{ts,js}'],
    migrations: [__dirname + '/../database/migrations/*{.js,.ts}'],
  };
}
