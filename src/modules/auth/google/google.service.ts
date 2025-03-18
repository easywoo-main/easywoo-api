import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
    public async googleLogin(googlePayload: Express.User) {
        console.log(googlePayload)
        return {
            message: 'User information from google',
        }

    }
}
