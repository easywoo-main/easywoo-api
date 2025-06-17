import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ErrorResponse } from '../../../errorHandler/errorResponse.dto';
import { RefreshToken } from '../../token/dtos/refresh.token.dto';
import { AccessToken } from '../../token/dtos/accessToken.dto';
import { UserCreateDto } from '../../user/dto/userCreate.dto';
import { CredentialsService } from './credentials.service';
import { LoginDto } from './login.dto';
import { UserAuthDto } from '../userAuth.dto';
import { JoiValidationPipe } from '../../../pipes/joi-validation.pipe';
import { userCreateSchema } from './user-create.schema';
import { loginSchema } from './login.schema';

@ApiTags('Auth')
@Controller('auth')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ type: UserAuthDto, description: 'Successful login' })
  @ApiNotFoundResponse({ type: ErrorResponse, description: 'User not found' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Invalid credentials' })
  async login(@Body(new JoiValidationPipe(loginSchema)) body: LoginDto) {
    return this.credentialsService.login(body);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ type: UserAuthDto, description: 'New access token generated' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Invalid refresh token' })
  async refreshToken(@Body() body: RefreshToken): Promise<AccessToken> {
    return this.credentialsService.refreshToken(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiOkResponse({ type: UserAuthDto, description: 'User successfully registered' })
  @ApiBadRequestResponse({ type: ErrorResponse, description: 'Invalid registration data' })
  async register(@Body(new JoiValidationPipe(userCreateSchema)) body: UserCreateDto) {
    return this.credentialsService.register(body);
  }
}
