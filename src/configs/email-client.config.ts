import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export const getEmailClient = (configService: ConfigService) => {
  return createTransport({
    host: configService.get('EMAIL_HOST'),
    port: configService.get('EMAIL_PORT'),
    secure: true,
    auth: {
      user: configService.get('EMAIL_USER'),
      pass: configService.get('EMAIL_PASS'),
    },
  });
};