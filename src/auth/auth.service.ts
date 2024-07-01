import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountStatus } from '@prisma/client';
import { compare } from 'bcryptjs';

import { UserRepository } from 'src/database/repository/user.repository';
import { User } from 'src/shared/interface/user.interface';


@Injectable()
export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    async login(email: string, pass: string) {
        try {
            const existingUser = await this.userRepo.find(email);
            const hashedPassword = existingUser ? existingUser.password : "";
            const samePassword = await compare(pass, hashedPassword);
            const isVerified = existingUser ? existingUser.accountStatus === AccountStatus.VERIFIED : false;
    
            if (!existingUser || !samePassword || !isVerified) {
                throw new BadRequestException("Invalid login credentials");
            }

            const token = this.createLoginToken(existingUser);
            const {password, ...user} = existingUser;

            return { token, user }; 
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException("Something went wrong");
        }
    }

    private createLoginToken(user: User) {
        const secretKey = this.configService.get("SECRET_KEY");
        const accessTokenDuration = "15m";
        const accessToken = this.jwtService.sign({
            sub: user.id
        }, {expiresIn: accessTokenDuration, secret: secretKey});

        const refreshTokenDuration = "30d";
        const refreshToken = this.jwtService.sign({
            sub: user.id,
            email: user.email
        }, {expiresIn: refreshTokenDuration, secret: secretKey});

        return {accessToken, refreshToken};
    }
}
