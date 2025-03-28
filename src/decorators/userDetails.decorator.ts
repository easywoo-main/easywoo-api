import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserDetails = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!request.user) {
    throw new UnauthorizedException('User is not logged in.');
  }
  return request.user;
});
