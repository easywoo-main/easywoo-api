import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserCreateDto } from '../user/dto/userCreate.dto';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserAuthDto } from './dto/userAuth.dto';
import { ErrorResponse } from '../../errorHandler/errorResponse.dto';
import { RefreshToken } from '../token/dtos/refresh.token.dto';
import { AccessToken } from '../token/dtos/accessToken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: UserAuthDto })
  @ApiNotFoundResponse({ type: ErrorResponse })
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  @ApiOkResponse({ type: UserAuthDto })
  async refreshToken(@Body() body: RefreshToken): Promise<AccessToken> {
    return this.authService.refreshToken(body);
  }

  @ApiOkResponse({ type: UserAuthDto })
  @Post('register')
  async register(@Body() body: UserCreateDto) {
    return this.authService.register(body);
  }
}
