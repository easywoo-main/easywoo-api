import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmailClient } from '../../configs/email.config';
import { Email } from './email.dto';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { Success } from '../../utils/success.utils';

@Injectable()
export class EmailService {
  constructor(private readonly storageClient: EmailClient) {}


  public async sendEmail(
    email: Email,
    receiverEmail: string,
  ) {
    const params = {
      Source: "SES_SENDER", //todo
      Destination: {
        ToAddresses: [receiverEmail]
      },
      Message: {
        Subject: {Data: email.subject},
        Body: {
          ...(email.message.text
            ? {Text: {Data: email.message.text}}
            : {Html: {Data: email.message.html}})
        },
      },
    };

    try {
      await this.storageClient.send(new SendEmailCommand(params));
      return new Success("Email sent successfully");
    } catch (error) {
      if (error.$metadata.httpStatusCode === 400) {
        throw new BadRequestException(error.message);
      }
      throw new InternalServerErrorException(error.message);
    }
  };

}
