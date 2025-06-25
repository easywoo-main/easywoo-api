import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { UserPayload } from '../token/payloads/userPayload.interface';
import { TokenType } from '../token/token-type.enum';
import { AdminPayload } from '../token/payloads/adminPayload.interface';
import { Payload } from '../token/payloads/payload.interface';
import { AdminService } from '../admin/admin.service';
import { RoleService } from '../role/role.service';
import { PermissionDto } from '../role/dtos/permission.dto';
import { PasswordResetPayload } from '../token/payloads/passwordResetPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly tokenService: TokenService,
    private readonly roleService: RoleService
  ) {}

  public async verifyTokenUserToken(token?: string): Promise<UserPayload> {
    return this.verifyToken<UserPayload>(TokenType.ACCESS, token);
  }

  public async verifyAdminToken(token?: string): Promise<AdminPayload> {
    return this.verifyToken<AdminPayload>(TokenType.ADMIN_ACCESS, token);
  }

  public async verifyResetPasswordToken(token?: string): Promise<PasswordResetPayload> {
    return this.verifyToken<PasswordResetPayload>(TokenType.PASSWORD_RESET, token);
  }

  private async verifyToken<T extends Payload>(tokenType: TokenType,token?: string): Promise<T> {
    if (!token) {
      throw new UnauthorizedException('Access denied. No access token provided.');
    }
    const decodedToken: T = await this.tokenService.verifyTokenByType<T>(token, tokenType);

    if (!decodedToken) {
      throw new UnauthorizedException('Access denied. Invalid access token.');
    }
    return decodedToken;
  }

  public async verifyUser(payload: UserPayload): Promise<boolean> {
    const user = await this.userService.findUserById(payload.id);

    // todo: uncomment this code when email verification is implemented
    // if (!user.isVerified) {
    //   throw new UnauthorizedException('Access denied. User is not verified');
    // }
    return true;
  }

  async verifyAdmin(user: AdminPayload): Promise<boolean> {
    const admin = await this.adminService.findAdminById(user.id);
    return true;
  }

  public async checkIfAdminHavePermission(roleId: string, permissionDto: PermissionDto): Promise<boolean> {
    const role = await this.roleService.getRoleById(roleId);
    for (const [key, value] of Object.entries(permissionDto)) {
      if (value && !role[key]){
        throw new ForbiddenException('Access denied. Invalid permission.');
      }
    }
    return true
  }
}
