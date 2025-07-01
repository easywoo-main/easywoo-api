import { Controller, Get, UseGuards, Req, Res, Post, Body, UnauthorizedException } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AppleService } from './apple.service';
import { UserDetails } from '../../../decorators';
import { UserAuthDto } from '../userAuth.dto';

@ApiTags('Auth')
@Controller('auth/apple')
export class AppleController {
  constructor(private readonly appleService: AppleService) {}


  @Get()
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Redirect to Apple authentication' })
  @ApiResponse({ status: 302, description: 'Redirecting to Apple login' })
  async appleAuth(@Req() _req: Request, @Res() _res: Response) {
    // Apple authentication
  }

  @Post('/callback')
  @UseGuards(AuthGuard('apple'))
  @ApiOperation({ summary: 'Handle Apple authentication callback' })
  @ApiOkResponse({ type: UserAuthDto, description: 'Successful login' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async redirect(@Body() body: any, @UserDetails() user: ApplePayload): Promise<any> {
    console.log("apple-body", body, user);
    return this.appleService.appleLogin(user);
  }
}
