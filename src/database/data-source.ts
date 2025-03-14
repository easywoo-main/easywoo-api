import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { databaseConfig } from '../configs/database.config';

export const AppDataSource = new DataSource(databaseConfig(new ConfigService()));
