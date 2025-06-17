import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/modules/auth/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request?.headers?.authorization?.split(' ')?.pop();

    request.user = await this.authService.verifyToken(token);

    return true;
  }
}
