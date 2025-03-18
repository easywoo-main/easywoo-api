import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GoogleService } from './google.service';

@ApiTags('Auth')
@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirect to Google authentication' })
  @ApiResponse({ status: 302, description: 'Redirecting to Google login' })
  public async googleAuth() {}

  @Get('callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Handle Google authentication callback' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  public async googleAuthRedirect(@Req() req: Request) {
    const googlePayload = req.user;
    return this.googleAuthService.googleLogin(googlePayload);
  }
}
