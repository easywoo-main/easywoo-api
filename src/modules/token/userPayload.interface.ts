import { TokenType } from "./token-type.enum";
import { JwtPayload } from 'jsonwebtoken';
import { Payload } from './payload.interface';

interface UserPayload extends Payload<TokenType.ACCESS | TokenType.REFRESH>{
  id?: string;
  email?: string;
  isVerified?: boolean;
}
export { UserPayload };
