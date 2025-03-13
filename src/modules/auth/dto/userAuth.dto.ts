import {User} from "../../user/user.entity";
import {Tokens} from "../../../interfaces";


export class UserAuthDto implements  Tokens{
    user: User
    refreshToken: string;
    accessToken: string;
}