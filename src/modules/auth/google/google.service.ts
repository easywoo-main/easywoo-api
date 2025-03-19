import {Injectable, UnauthorizedException} from '@nestjs/common';
import {GoogleClient} from "./googleClient";
import {GoogleUser} from "./google.entity";
import {TokenService} from "../../token/token.service";
import {UserService} from "../../user/user.service";
import {GoogleCreateDto} from "./dtos/googleCreate.dto";
import {UserCreateDto} from "../../user/dto/userCreate.dto";
import {GoogleRepository} from "./google.repository";
import {UserAuthDto} from "../userAuth.dto";
import {GoogleUserWithUser} from "./dtos/googleUserWithUser.dto";
import { ConfigService } from '@nestjs/config';
import {getGoogleConfig} from "../../../configs/google.config";
import {GoogleCallbackDto} from "./dtos/googleCallback.dto";
import {GoogleRedirectDto} from "./dtos/googleRedirect.dto";

@Injectable()
export class GoogleService {
  constructor(
      private readonly googleClient: GoogleClient,
      private readonly googleRepository: GoogleRepository,
      private readonly tokenService: TokenService,
      private readonly userService: UserService,
      private readonly configService: ConfigService
  ) {}

  public async googleAuth(googleCallbackDto: GoogleCallbackDto): Promise<UserAuthDto> {
     console.log(googleCallbackDto.idToken)
    // const {tokens} = await this.googleClient.getToken(googleCallbackDto.authCode);
    // this.googleClient.setCredentials(tokens);
    const ticket = await this.googleClient.verifyIdToken({idToken: googleCallbackDto.idToken,});
    const payload = ticket.getPayload();
    if (!payload) {
      throw new UnauthorizedException("Invalid token");
    }

    console.log("payload", payload)
    let googleUser = await this.findOneByEmail(payload.email!);
    console.log("googleUser", googleUser)
    let user, existingGoogleUser;

    if (googleUser) {
      ({ user, ...existingGoogleUser } = googleUser);
    }
    console.log("existingGoogleUser", existingGoogleUser)
    let existingUser = await this.userService.findUserByEmail(payload.email!);

    console.log("existingGoogleUser", existingGoogleUser)

    const userDto: UserCreateDto = {
      name: payload.name,
      email: payload.email,
    };

    const googleUserDto: GoogleCreateDto = {
      googleAccountId: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      picture: payload.picture,
      emailVerified: payload.email_verified,
    };

    if (!existingUser && !existingGoogleUser) {
      existingUser = await this.userService.createUser(userDto);
      existingGoogleUser = await this.createGoogleUser(googleUserDto);
    }
    if (!existingUser && existingGoogleUser) {
      existingUser = await this.userService.findUserById(user.id);
      existingGoogleUser = await this.updateGoogleUser(
          existingGoogleUser.id,
          googleUserDto,
      );
    }
    if (existingUser && !existingGoogleUser) {
      await this.createGoogleUser(googleUserDto);
    }
    const accessTokens = await this.tokenService.generateAccessTokens(existingUser);

    return {
      user: existingUser,
      ...accessTokens,
    }
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
