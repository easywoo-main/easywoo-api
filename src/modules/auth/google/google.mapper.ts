import { TokenPayload } from 'google-auth-library';
import { GoogleCreateDto } from './dtos/googleCreate.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleMapper {

  public userPayloadToGoogleDto(payload: TokenPayload): GoogleCreateDto {
    return {
      googleAccountId: payload.sub,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      picture: payload.picture,
      emailVerified: payload.email_verified,
    };
  }
}