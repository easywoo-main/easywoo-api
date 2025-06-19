import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { UserPayload } from '../token/userPayload.interface';
import { TokenType } from '../token/token-type.enum';
import { AdminPayload } from '../token/adminPayload.interface';
import { Payload } from '../token/payload.interface';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly tokenService: TokenService,
  ) {}

  public async verifyTokenUserToken(token?: string): Promise<UserPayload> {
    return this.verifyToken<UserPayload>(TokenType.ACCESS, token);
  }

  public async verifyAdminToken(token?: string): Promise<AdminPayload> {
    return this.verifyToken<AdminPayload>(TokenType.ADMIN_ACCESS, token);
  }


  private async verifyToken<T extends Payload>(tokenType: TokenType,token?: string): Promise<T> {
    if (!token) {
      throw new UnauthorizedException('Access denied. No access token provided.');
    }
    const decodedToken: T = await this.tokenService.verifyTokenByType<T>(token, tokenType);
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

  async verifyAdmin(user: AdminPayload): Promise<boolean> {
    const admin = await this.adminService.findAdminById(user.id);
    console.log("verifyAdmin", admin);
    return true;
  }
}
