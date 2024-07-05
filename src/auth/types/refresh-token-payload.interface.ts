import { AuthToken } from "src/auth/enum/auth-token.enum";

export interface RefreshTokenPayload {
    sub: string;
    email: string;
    token: AuthToken;
    exp: number;
    iat: number;
}