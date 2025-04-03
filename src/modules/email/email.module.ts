import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailClient } from '../../configs/email.config';

@Module({
  providers: [EmailService, EmailClient]
})
export class EmailModule {}
