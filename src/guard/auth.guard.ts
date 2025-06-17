import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../modules/token/token.service';
import { UserService } from '../modules/user/user.service';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class AuthGuard extends TokenGuard {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {
    super(reflector, authService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const isValid: boolean = await super.canActivate(context);
    if (!isValid) {
      throw new UnauthorizedException('Access denied. Invalid access token.');
    }

    const request = context.switchToHttp().getRequest();
    return this.authService.verifyUser(request.user);
  }
}
