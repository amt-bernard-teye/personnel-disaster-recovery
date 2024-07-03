import { AuthToken } from "src/auth/enum/auth-token.enum";

export interface JwtTokenPayload {
    sub: string; 
    token: AuthToken; 
    exp: number; 
    iat: number;
}