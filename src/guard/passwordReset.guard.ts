import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../modules/token/token.service';
import { UserService } from '../modules/user/user.service';
import { AuthService } from '../modules/auth/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';

@Injectable()
export class PasswordResetGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')?.pop();

    request.user = await this.authService.verifyResetPasswordToken(token);

    return true;

  }
}
