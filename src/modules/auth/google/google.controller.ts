import { Controller, Get, Body, Res, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GoogleService } from './google.service';
import { GoogleCallbackDto } from './dtos/googleCallback.dto';

@ApiTags('Auth')
@Controller('auth/google')
export class GoogleController {
  constructor(private readonly googleAuthService: GoogleService) {}

  @Get()
  @ApiOperation({ summary: 'Handle Google authentication callback' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  public async googleAuth(@Body() googleCallbackDto: GoogleCallbackDto) {
    return this.googleAuthService.googleAuth(googleCallbackDto);
  }
}
