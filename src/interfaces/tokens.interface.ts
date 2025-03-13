
interface Tokens extends AccessToken, RefreshToken{}

interface RefreshToken {
    refreshToken: string;
}

interface AccessToken {
    accessToken: string;
}

export { Tokens, AccessToken, RefreshToken};