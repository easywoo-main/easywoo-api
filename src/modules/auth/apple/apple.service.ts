import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { UserCreateDto } from '../../user/dto/userCreate.dto';
import { AppleUserEntity } from './appleUser.entity';
import { CreateAppleUserDto } from './dtos/createAppleUser.dto';
import { AppleUserRepository } from './apple.repository';
import { TokenService } from 'src/modules/token/token.service';

@Injectable()
export class AppleService {
  constructor(
    private readonly userService: UserService,
    private readonly appleUserRepository: AppleUserRepository,
    private readonly tokenService: TokenService,
  ) {
  }
  public async appleLogin(payload: any) {

    let existingAppleUser = await this.findAppleUserByEmail(payload.email!);
    let existingUser = await this.userService.findUserByEmail(payload.email!);
    //todo:
    let googleUserDto: CreateAppleUserDto = {
      appleId: '',
      email: '',
      firstName: '',
      lastName: '',
      middleName: ''
    }
    const userDto: UserCreateDto = {
      name: payload.name,
      email: payload.email,
    };

    if (!existingUser && !existingAppleUser) {
      existingAppleUser = await this.createAppleUser(googleUserDto);
      userDto.email = googleUserDto.email;
      existingUser = await this.userService.createUser(userDto);
    }
    if (!existingUser && existingAppleUser) {
      existingAppleUser = await this.updateGoogleUser(existingAppleUser.id, googleUserDto);
    }
    if (existingUser && !existingAppleUser) {
      await this.createAppleUser(googleUserDto);
    }
    const accessTokens = await this.tokenService.generateAccessTokens(existingUser);

    return {
      user: existingUser,
      ...accessTokens,
    };
  }

  public async findAppleUserByEmail(email: string): Promise<AppleUserEntity> {
    return this.appleUserRepository.findAppleUserByEmail(email);
  }

  public async createAppleUser(appleUserDto: CreateAppleUserDto): Promise<AppleUserEntity> {
    return this.appleUserRepository.createAppleUser(appleUserDto);
  }

  public async updateGoogleUser(appleUserId: string, appleUserDto: CreateAppleUserDto): Promise<AppleUserEntity> {
    return
  }

}
