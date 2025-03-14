import { TokenType } from '../enums';

interface UserPayload {
  id?: string;
  email?: string;
  isVerified?: boolean;
  type?: TokenType.ACCESS | TokenType.REFRESH;
}
export { UserPayload };
