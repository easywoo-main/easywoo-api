import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleClient extends OAuth2Client {
  constructor(configService: ConfigService) {
    super({
      clientId: configService.get<string>('GOOGLE_CLIENT_ID'),
    });
  }
}
