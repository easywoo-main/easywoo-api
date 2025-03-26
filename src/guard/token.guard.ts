import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {TokenService} from "../../modules/token/token.service";
import {UserPayload} from "../../interfaces";
import {TokenType} from "../../enums";

export class TokenGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly tokenService: TokenService,
  ) {
    console.log('TokenGuard created')
    console.log('TokenGuard TokenService', TokenService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split(' ')?.pop();
    if (!token) {
      throw new UnauthorizedException('Access denied. No access token provided.');
    }
    const decodedToken: UserPayload = await this.tokenService.verifyTokenByType(token, TokenType.ACCESS);

    if (!decodedToken) {
      throw new UnauthorizedException('Access denied. Invalid access token.');
    }

    request.user = decodedToken;
    return true;
  }
}
