import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

import { UserRepository } from "src/database/repository/user.repository";
import { JwtTokenPayload } from "./interface/jwt-token-payload.interface";
import { AuthToken } from "src/auth/enum/auth-token.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    private secretKey;

    constructor(
        private userRepo: UserRepository,
        private configService: ConfigService,
        private jwtService: JwtService
    ) { 
        this.secretKey = this.configService.get("SECRET_KEY");
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = <Request>context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const [bearer, token] = authorization ? authorization.split(" ") : [];

        if (!authorization || !bearer || bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("Access denied");
        }

        try {
            const result = <JwtTokenPayload>this.jwtService.verify(token, {secret: this.secretKey});
            const existingUser = await this.userRepo.find(result.sub);

            if (!existingUser || result.token !== AuthToken.ACCESS) {
                throw new Error();
            }

            request["user"] = existingUser;
            return true;
        }
        catch(error) {
            throw new UnauthorizedException("Access denied");
        }
    }
}