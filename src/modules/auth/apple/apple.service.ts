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
  public async appleLogin(payload: ApplePayload) {

    let existingAppleUser = await this.findAppleUserByEmail(payload.email!);
    let existingUser = await this.userService.findUserByEmail(payload.email!);

    const googleUserDto = {
      appleId: payload.id,
      email: payload.email,
      firstName: payload?.name?.firstName || '',
      lastName: payload?.name?.lastName || "",
      middleName: payload?.name?.middleName || "",
    };

    const userDto: UserCreateDto = {
      name: payload?.name?.firstName || "",
      email: payload.email,
    };

    if (!existingUser && !existingAppleUser) {
      userDto.email = googleUserDto.email;
      existingUser = await this.userService.createUser(userDto);
      existingAppleUser = await this.createAppleUser(existingUser.id,  googleUserDto);
    }
    if (!existingUser && existingAppleUser) {
      existingUser = await this.userService.createUser({
        email: existingAppleUser.email,
        name: existingAppleUser.firstName,
        appleUserId: existingAppleUser.id
      });
    }
    if (existingUser && !existingAppleUser) {
      await this.createAppleUser(existingUser.id,  googleUserDto);
    }
    const accessTokens = this.tokenService.generateAccessTokens(existingUser);

    return {
      user: existingUser,
      ...accessTokens,
    };
  }

  public async findAppleUserByEmail(email: string): Promise<AppleUserEntity> {
    return this.appleUserRepository.findAppleUserByEmail(email);
  }

  public async createAppleUser(userId: string, appleUserDto: CreateAppleUserDto): Promise<AppleUserEntity> {
    const newAppleUser = await this.appleUserRepository.createAppleUser(appleUserDto);
    await this.userService.updateUser(userId, {appleUserId: newAppleUser.id});
    return newAppleUser;
  }

  public async updateAppleUser(appleUserId: string, appleUserDto: CreateAppleUserDto): Promise<AppleUserEntity> {
    delete appleUserDto.firstName
    delete appleUserDto.lastName
    delete appleUserDto.middleName
    return this.appleUserRepository.updateAppleUser(appleUserId, appleUserDto);
  }

}
