import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export function googleConfig(configService: ConfigService) {
  return {
    clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
    clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
    callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
    scope: ['profile', 'email'],
  };
}
