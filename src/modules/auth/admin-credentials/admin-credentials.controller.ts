import { Body, Controller, Post } from '@nestjs/common';
import { AdminCredentialsService } from './admin-credentials.service';
import { AdminLoginDto } from './dtos/admin-login.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserAuthDto } from '../userAuth.dto';
import { ErrorResponse } from '../../../errorHandler/errorResponse.dto';
import { RefreshToken } from '../../token/dtos/refresh.token.dto';
import { AccessToken } from '../../token/dtos/accessToken.dto';

@Controller('admin-credentials')
export class AdminCredentialsController {
  constructor(private readonly adminCredentialsService: AdminCredentialsService) {}

  @Post("login")
  public async login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminCredentialsService.login(adminLoginDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ type: UserAuthDto, description: 'New access token generated' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Invalid refresh token' })
  async refreshToken(@Body() body: RefreshToken): Promise<AccessToken> {
    return this.adminCredentialsService.refreshToken(body);
  }

}
