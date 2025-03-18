import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { getGoogleConfig } from '../../../configs/google.config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super(getGoogleConfig(configService));
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    const { id, displayName, emails } = profile;
    const user = { googleId: id, name: displayName, email: emails[0].value };
    done(null, user);
  }
}
