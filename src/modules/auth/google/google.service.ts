import { Injectable } from '@nestjs/common';
import {GoogleClient} from "./googleClient";

@Injectable()
export class GoogleService {
  constructor(private readonly googleClient: GoogleClient) {}

  public async googleLogin(googlePayload: Express.User) {
    console.log(googlePayload);
    return {
      message: 'User information from google',
    };
  }
}
