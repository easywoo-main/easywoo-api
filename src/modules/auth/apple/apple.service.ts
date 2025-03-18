import { Injectable } from '@nestjs/common';

@Injectable()
export class AppleService {
  public async appleLogin(applePayload: Express.User) {
    return applePayload;
  }
}
