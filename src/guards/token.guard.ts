import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../modules/token/token.service';
import { Reflector } from '@nestjs/core';
import { UserPayload } from '../interfaces';
import { TokenType } from '../enums';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly tokenService: TokenService,
  ) {}

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
    const decodedToken: UserPayload = await this.tokenService.verifyTokenByType("eyJhbGciOiJSUzI1NiIsImtpZCI6IjkxNGZiOWIwODcxODBiYzAzMDMyODQ1MDBjNWY1NDBjNmQ0ZjVlMmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjI4NjEwNDkyMi01NTViNjB2NGFrMWMwMjU5dm91c3VsOXNmcm1qZTVyOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjU2Mjg2MTA0OTIyLTU1NWI2MHY0YWsxYzAyNTl2b3VzdWw5c2ZybWplNXI4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExODA3NjMxMDAyMzg5MzczNzYzIiwiaGQiOiJiZWV0ZWNoeS5jb20iLCJlbWFpbCI6ImFuZHJpeS52b3ZrQGJlZXRlY2h5LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiY2ppUG4xeEZzSGRQUWdPbG1mMnNlQSIsIm5hbWUiOiJBbmRyaXkgVm92ayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMRGh4VktNUjRDZ0ZpU1FNSDJrNnVyMkJxbnVqenJyb1Z2QlZTcWJhYjFPTXc5SEE9czk2LWMiLCJnaXZlbl9uYW1lIjoiQW5kcml5IiwiZmFtaWx5X25hbWUiOiJWb3ZrIiwiaWF0IjoxNzQyMzgxMzExLCJleHAiOjE3NDIzODQ5MTF9.Ymx5Uh2QrxMaWI2Y0U1xM51PJYhTz98HNkR5gqubDVVCLTOZ7Cqyx8pHI6p-Aa1uVHYkz-0s8YD0dbpktXoDCN9A7aNQ7y29SlvkOw0MegCJI8AQBQcNAGiPxCj14fALS0rj6JuAIRl4W57TE0q2Bh6s7o20B02Xgu-lpFvsi2SeN2amnRp2h4rmVfJbYBksE-H2MOmS6lAFOUNw7hGQ8WAkDh0TM8ah4A8D7EAjFV_Z3s-5QR3DlvdjIRBeWFuEDmpy64q7dtsrXdqOA3MIgIB-IqhpXAjklxeIpU4m5TUPNyFMxm_j-SDXS_Cx_YPsBTOwijdxro2MmGLVdX6bTQ", TokenType.ACCESS);

    if (!decodedToken) {
      throw new UnauthorizedException('Access denied. Invalid access token.');
    }

    request.user = decodedToken;
    return true;
  }
}
