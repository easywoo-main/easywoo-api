import { SESClient } from '@aws-sdk/client-ses';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailClient extends SESClient {
  constructor(configService: ConfigService) {
    super();
  }
}