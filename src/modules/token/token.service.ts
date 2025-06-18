import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './dtos/tokens.dto';
import { TokenType } from './token-type.enum';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './userPayload.interface';
import { Payload } from './payload.interface';
import { AdminPayload } from './adminPayload.interface';
import { UserEntity } from '../user/user.entity';
import { AdminEntity } from '../admin/admin.entity';

@Injectable()
export class TokenService {
  private readonly ACCESS_TOKEN_EXPIRE: number;
  private readonly REFRESH_TOKEN_EXPIRE: number;
  private readonly JWT_SECRET_KEY: string;
  private readonly JWT_ADMIN_SECRET_KEY: string;

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService) {
    this.ACCESS_TOKEN_EXPIRE = configService.get<number>('ACCESS_TOKEN_EXPIRE')!;
    this.REFRESH_TOKEN_EXPIRE = configService.get<number>('REFRESH_TOKEN_EXPIRE')!;
    this.JWT_SECRET_KEY = configService.get<string>('JWT_SECRET_KEY')!;
    this.JWT_ADMIN_SECRET_KEY = configService.get<string>('JWT_ADMIN_SECRET_KEY')!;
  }

  private generateToken(data: Payload, expiresIn: number, secret: string): string {
    return this.jwtService.sign(data, { secret, expiresIn })
  }

  public generateTokenByType(data: Payload, type: TokenType): string {
    data.type = type;

    switch (type) {
      case TokenType.ACCESS:
        return this.generateToken(data, this.ACCESS_TOKEN_EXPIRE, this.JWT_SECRET_KEY);
      case TokenType.REFRESH:
        return this.generateToken(data, this.REFRESH_TOKEN_EXPIRE, this.JWT_SECRET_KEY);
      case TokenType.ADMIN_ACCESS:
        return this.generateToken(data, this.ACCESS_TOKEN_EXPIRE, this.JWT_ADMIN_SECRET_KEY);
      case TokenType.ADMIN_REFRESH:
        return this.generateToken(data, this.REFRESH_TOKEN_EXPIRE, this.JWT_ADMIN_SECRET_KEY);
    }
  }

  private verifyToken<T extends Payload>(token: string, secretKey: string): T {
    try {
      return this.jwtService.verify<T>(token, { secret: secretKey });
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }
  }

  public async verifyTokenByType<T extends Payload>(token: string, type: TokenType) {
    if (!token) {
      throw new UnauthorizedException('Access denied. No access token provided.');
    }
    let data: T;

    switch (type) {
      case TokenType.ACCESS:
      case TokenType.REFRESH:
        data = this.verifyToken<T>(token, this.JWT_SECRET_KEY);
        break;
      case TokenType.ADMIN_REFRESH:
      case TokenType.ADMIN_ACCESS:
        data = this.verifyToken<T>(token, this.JWT_ADMIN_SECRET_KEY);
    }
    if (data.type !== type) {
      throw new BadRequestException('Invalid token');
    }
    return data;
  }

  public async generateAccessTokens(user: UserEntity): Promise<Tokens> {
    const tokenUser = {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
    } as UserPayload;

    const accessToken = this.generateTokenByType(tokenUser, TokenType.ACCESS);
    const refreshToken = this.generateTokenByType(tokenUser, TokenType.REFRESH)
    return { accessToken, refreshToken };
  }

  public async generateAdminAccessTokens(admin: AdminEntity): Promise<Tokens> {
    const adminToken: AdminPayload = {
      id: admin.id,
      userName: admin.userName,
    }

    const accessToken = this.generateTokenByType(adminToken, TokenType.ADMIN_ACCESS);
    const refreshToken = this.generateTokenByType(adminToken, TokenType.ADMIN_REFRESH)

    return { accessToken, refreshToken };
  }
}
