import {TokenType} from "../enums";

interface UserPayload {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    isVerified?: boolean;
    type?: TokenType.ACCESS | TokenType.REFRESH;
}
export { UserPayload };