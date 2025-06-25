import { Inject, Injectable } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { Mail } from './mail.interface';
import { ConfigService } from '@nestjs/config';
import { Success } from '../../utils/success.utils';

@Injectable()
export class EmailService {
  private readonly SENDER_EMAIL : string;

  constructor(
    @Inject('EMAIL_CLIENT') private readonly emailClient: Transporter,
    configService: ConfigService,
  ) {
    this.SENDER_EMAIL = configService.get('SENDER_EMAIL');
  }

  public async sendEmail(emailRecipient: string, mail: Mail) {
    const mailOptions = {
      from: this.SENDER_EMAIL,
      to: emailRecipient,
      subject: mail.subject,
      text: mail.text,
    };

    await this.emailClient.sendMail(mailOptions);

    return new Success("Email sent successfully.");
  }
}
