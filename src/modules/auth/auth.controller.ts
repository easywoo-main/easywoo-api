import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from '../../interfaces';
import { UserCreateDto } from '../user/dto/userCreate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshToken) {
    return this.authService.refreshToken(body);
  }

  @Post('register')
  async register(@Body() body: UserCreateDto) {
    return this.authService.register(body);
  }
}
