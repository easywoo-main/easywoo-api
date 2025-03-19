import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();

export function getGoogleConfig(configService: ConfigService) {
  return {
    clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
  };
}