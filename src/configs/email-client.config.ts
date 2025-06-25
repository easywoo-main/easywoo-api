import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export const getEmailClient = (configService: ConfigService) => {
  return createTransport({
    host: configService.get('EMAIL_HOST'), // Витягувати параметри з конфігурації
    port: configService.get('EMAIL_PORT'),
    secure: false, // Якщо використовуєш SSL/TLS
    auth: {
      user: configService.get('EMAIL_USER'),
      pass: configService.get('EMAIL_PASS'),
    },
  });
};