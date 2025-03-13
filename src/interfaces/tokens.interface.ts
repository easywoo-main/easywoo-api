import {AccessToken} from "./accessToken.interface";

interface Tokens extends AccessToken{
    refreshToken: string;
}

export { Tokens };