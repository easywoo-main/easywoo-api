import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor() {
    super({
      clientID: process.env.APPLE_CLIENT_ID,
      teamID: process.env.APPLE_TEAM_ID,
      keyID: process.env.APPLE_KEY_ID,
      // privateKey: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Якщо зберігаєте в .env
      callbackURL: process.env.APPLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['email', 'name'],
    });
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any) {
    const user = {
      appleId: profile?.id,
      name: profile?.name?.firstName ? `${profile.name.firstName} ${profile.name.lastName || ''}`.trim() : null,
      email: profile?.emails?.[0] || null,
    };

    return user;
  }
}
