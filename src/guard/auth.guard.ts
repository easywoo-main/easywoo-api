import { ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../modules/token/token.service';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class AuthGuard extends TokenGuard {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {
    super(reflector, tokenService);
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
    const payload = request.user;
    const user = await this.userService.findUserById(payload.id);

    //todo: uncomment this code when email verification is implemented
    // if (!user.isVerified) {
    //   throw new UnauthorizedException('Access denied. User is not verified');
    // }
    return true;
  }
}
