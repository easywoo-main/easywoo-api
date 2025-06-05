import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
import { UserCreateDto } from '../../user/dto/userCreate.dto';
import { User } from '@prisma/client';
import { UserAuthDto } from '../userAuth.dto';
import { LoginDto } from './login.dto';
import { RefreshToken } from '../../token/dtos/refresh.token.dto';
import { AccessToken } from '../../token/dtos/accessToken.dto';
import { UserPayload } from '../../token/userPayload.interface';
import { TokenType } from '../../token/token-type.enum';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  public async register(userDto: UserCreateDto): Promise<UserAuthDto> {
    const newUser: User = await this.userService.createUser(userDto);
    const tokens = await this.tokenService.generateAccessTokens(newUser);

    return {
      user: newUser,
      ...tokens,
    };
  }

  public async login(loginDto: LoginDto): Promise<UserAuthDto> {
    const user: User = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await this.userService.verifyUserPassword(user.id, loginDto.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid password');
    }

    const tokens = await this.tokenService.generateAccessTokens(user);

    return {
      user,
      ...tokens,
    };
  }

  public async refreshToken(body: RefreshToken): Promise<AccessToken> {
    const userTokenPayload: UserPayload = await this.tokenService.verifyTokenByType(body.refreshToken, TokenType.REFRESH);
    const user: User = await this.userService.findUserById(userTokenPayload.id);
    const { accessToken } = await this.tokenService.generateAccessTokens(user);
    return { accessToken };
  }
}
