import { TokenType } from "./token-type.enum";

interface UserPayload {
  id?: string;
  email?: string;
  isVerified?: boolean;
  type?: TokenType.ACCESS | TokenType.REFRESH;
}
export { UserPayload };
