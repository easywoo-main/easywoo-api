import { TokenType } from './token-type.enum';

export const a: Record<TokenType, { secretKey: string, expires: number }> = {
  [TokenType.ACCESS]: { secretKey: 'JWT_SECRET_KEY', expires: 3600 },
  [TokenType.REFRESH]: { secretKey: 'JWT_SECRET_KEY', expires: 7200 },
  [TokenType.ADMIN_ACCESS]: { secretKey: 'JWT_ADMIN_SECRET_KEY', expires: 3600 },
  [TokenType.ADMIN_REFRESH]: { secretKey: 'JWT_ADMIN_SECRET_KEY', expires: 7200 },
  [TokenType.PASSWORD_RESET]: { secretKey: 'JWT_SECRET_KEY', expires: 3600 },
}