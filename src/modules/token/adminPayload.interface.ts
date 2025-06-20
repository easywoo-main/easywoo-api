import { Payload } from "./payload.interface";
import { TokenType } from './token-type.enum';

export interface AdminPayload extends Payload<TokenType.ADMIN_ACCESS | TokenType.ADMIN_REFRESH> {
  id: string;
  userName: string;
  roleId: string;
}