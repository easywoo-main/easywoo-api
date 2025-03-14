import {DataSource} from 'typeorm';
import {ConfigService} from "@nestjs/config";
import {getDatabaseConfig} from "../configs/getDatabaseConfig";


export const AppDataSource = new DataSource(getDatabaseConfig(new ConfigService()));