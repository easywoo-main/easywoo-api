import { Payload } from './payload.interface';
import { TokenType } from '../token-type.enum';

export interface PasswordResetPayload extends Payload<TokenType.PASSWORD_RESET>{
  id: string;
  email: string;
}