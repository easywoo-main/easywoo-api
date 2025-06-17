import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { UserPayload } from '../token/userPayload.interface';
import { TokenType } from '../token/token-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async verifyToken(token: string): Promise<UserPayload> {
    if (!token) {
      throw new UnauthorizedException('Access denied. No access token provided.');
    }
    const decodedToken: UserPayload = await this.tokenService.verifyTokenByType(token, TokenType.ACCESS);
    console.log("decodedToken", decodedToken);

    if (!decodedToken) {
      throw new UnauthorizedException('Access denied. Invalid access token.');
    }
    return decodedToken;
  }

  public async verifyUser(payload: UserPayload): Promise<boolean> {
    console.log('verifyUser', payload);
    const user = await this.userService.findUserById(payload.id);
    console.log("user", user)

    // todo: uncomment this code when email verification is implemented
    // if (!user.isVerified) {
    //   throw new UnauthorizedException('Access denied. User is not verified');
    // }

    return true;
  }
}
