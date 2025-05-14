import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GoogleUser } from './google.entity';
import { TokenService } from '../../token/token.service';
import { UserService } from '../../user/user.service';
import { GoogleCreateDto } from './dtos/googleCreate.dto';
import { UserCreateDto } from '../../user/dto/userCreate.dto';
import { GoogleRepository } from './google.repository';
import { UserAuthDto } from '../userAuth.dto';
import { GoogleUserWithUser } from './dtos/googleUserWithUser.dto';
import { GoogleCallbackDto } from './dtos/googleCallback.dto';
import { UserEntity } from '../../user/user.entity';
import { GoogleClient } from '../../../configs/google.config';
import { TokenPayload } from 'google-auth-library';
import { GoogleMapper } from './google.mapper';

@Injectable()
export class GoogleService {
  constructor(
    private readonly googleClient: GoogleClient,
    private readonly googleRepository: GoogleRepository,
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
    private readonly googleMapper: GoogleMapper,
  ) {}

  public async googleAuth(googleCallbackDto: GoogleCallbackDto): Promise<UserAuthDto> {
    const payload = await this.verifyToken(googleCallbackDto.idToken)

    let googleUser = await this.findOneByEmail(payload.email!);
    let user: UserEntity, existingGoogleUser: GoogleUser;

    if (googleUser) {
      ({ user, ...existingGoogleUser } = googleUser);
    }
    let existingUser = await this.userService.findUserByEmail(payload.email!);

    const userDto: UserCreateDto = {
      name: payload.name,
      email: payload.email,
    };

    const googleUserDto = this.googleMapper.userPayloadToGoogleDto(payload);

    if (!existingUser && !existingGoogleUser) {
      existingUser = await this.userService.createUser(userDto);
      existingGoogleUser = await this.createGoogleUser(googleUserDto);
    }
    if (!existingUser && existingGoogleUser) {
      existingUser = await this.userService.findUserById(user.id);
      existingGoogleUser = await this.updateGoogleUser(existingGoogleUser.id, googleUserDto);
    }
    if (existingUser && !existingGoogleUser) {
      await this.createGoogleUser(googleUserDto);
    }
    const accessTokens = await this.tokenService.generateAccessTokens(existingUser);

    return {
      user: existingUser,
      ...accessTokens,
    };
  }

  private async verifyToken(idToken: string): Promise<TokenPayload> {
    const ticket = await this.googleClient.verifyIdToken({ idToken });
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload;
  }

  public async createGoogleUser(googleDto: GoogleCreateDto): Promise<GoogleUser> {
    return this.googleRepository.createGoogleUser(googleDto);
  }

  public async updateGoogleUser(id: string, googleDto: Partial<GoogleUser>): Promise<GoogleUser> {
    return this.googleRepository.updateGoogleUser(id, googleDto);
  }

  public async findOneByEmail(email: string): Promise<GoogleUserWithUser> {
    return this.googleRepository.findOneByEmail(email);
  }
}
