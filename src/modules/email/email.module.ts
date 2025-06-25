import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { getEmailClient } from '../../configs/email-client.config';

@Module({
  providers: [
    {
      provide: 'EMAIL_CLIENT',
      useFactory: getEmailClient,
      inject: [ConfigService],
    },
    EmailService
  ],
  exports: [EmailService],
})
export class EmailModule {}
