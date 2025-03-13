import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export async function databaseConfig(
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),

    synchronize: true,
    logging: false,

    entities: [
      __dirname + '/../**/*.entity.{ts,js}',
      __dirname + '/../entity/*.entity.{ts,js}',
    ],
    migrations: [__dirname + '/../**/migrations/**/*{.js,.ts}'],
  };
}
