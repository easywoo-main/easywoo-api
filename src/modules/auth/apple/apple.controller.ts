import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AppleService } from './apple.service';

@ApiTags('Auth')
@Controller('auth/apple')
export class AppleController {
  constructor(private readonly appleService: AppleService) {}

  @Get()
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Redirect to Apple authentication' })
  @ApiResponse({ status: 302, description: 'Redirecting to Apple login' })
  public async appleAuth() {}

  @Get('callback')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Handle Apple authentication callback' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  public async appleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const applePayload = req.user;
    return this.appleService.appleLogin(applePayload);
  }
}
