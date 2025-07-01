import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from '@arendajaelu/nestjs-passport-apple';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('APPLE_CLIENTID'),
      teamID: config.get<string>('APPLE_TEAMID'),
      keyID: config.get<string>('APPLE_KEYID'),
      key: config.get<string>('APPLE_OAUTH_KEY')!.replace(/\\n/g, '\n'),
      callbackURL: config.get<string>('APPLE_CALLBACK'),
      passReqToCallback: false,
      scope: ['email', 'name']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: ApplePayload, done: any): Promise<any> {
    console.log('profile', profile);
    return done(null, profile);
  }
}
