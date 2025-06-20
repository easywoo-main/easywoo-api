import { ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenGuard } from './token.guard';
import { Reflector } from '@nestjs/core';
import { TokenService } from '../modules/token/token.service';
import { UserService } from '../modules/user/user.service';
import { AuthService } from '../modules/auth/auth.service';
import { IS_PUBLIC_KEY } from '../decorators/isPublic.decorator';
import { AdminGuard } from './admin.guard';
import { RoleService } from '../modules/role/role.service';

@Injectable()
export class AdminRoleGuard extends AdminGuard {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly authService: AuthService,
  ) {
    super(reflector, authService);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    if (!request?.user?.roleId){
      throw new UnauthorizedException('User is not authorized');
    }
    return await this.authService.checkIfAdminHavePermission(request?.user?.roleId, {isEditAdmin: true})
  }
}
