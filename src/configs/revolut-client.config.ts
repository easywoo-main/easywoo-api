import axios from 'axios';
import { ConfigService } from '@nestjs/config';

export const getRevolutClient = (configService: ConfigService) => {
  return axios.create({
    baseURL: `${configService.get<string>('REVOLUT_URL')}/api/1.0`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${configService.get<string>('REVOLUT_SECRET_KEY')}`,
    }
  });
}