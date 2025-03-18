import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-apple';

@Injectable()
export class AppleAuthStrategy extends PassportStrategy(Strategy, 'apple') {
    constructor() {
        super({
            clientID: process.env.APPLE_CLIENT_ID,
            teamID: process.env.APPLE_TEAM_ID,
            keyID: process.env.APPLE_KEY_ID,
            privateKeyLocation: process.env.APPLE_PRIVATE_KEY_PATH,
            callbackURL: process.env.APPLE_CALLBACK_URL,
            passReqToCallback: true,
        });
    }

    async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: Function) {
        const { id, emails, displayName } = profile;

        const user = {
            appleId: id,
            name: displayName,
            email: emails ? emails[0].value : null,
        };

        done(null, user);
    }
}
