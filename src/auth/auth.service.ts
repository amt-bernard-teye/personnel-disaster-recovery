import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AccountStatus, Role } from '@prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';

import { UserRepository } from 'src/database/repository/user.repository';
import { RegisterAccount } from './types/register-account.interface';
import { User } from 'src/shared/interface/user.interface';
import { RegisterAccountService } from 'src/mailer/service/register-account.service';
import { ForgotPasswordService } from 'src/mailer/service/forgot-password.service';
import { subscribe } from 'diagnostics_channel';

@Injectable()
export class AuthService {
    private secretKey: string;

    constructor(
        private userRepo: UserRepository,
        private configService: ConfigService,
        private jwtService: JwtService,
        private accRegService: RegisterAccountService,
        private forgotPasswordService: ForgotPasswordService
    ) { 
        this.secretKey = this.configService.get("SECRET_KEY");
    }

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

    async register(body: RegisterAccount) {
        try {
            const existingUser = await this.userRepo.find(body.email);

            if (existingUser) {
                throw new BadRequestException("Email already exist");
            }

            const salt = await genSalt(10);
            const hashedPassword = await hash(body.password, salt);
            const addedUser = await this.userRepo.add({
                name: body.name,
                email: body.email,
                password: hashedPassword,
                accountStatus: AccountStatus.PENDING,
                role: Role.PERSONNEL,
            });

            const secretKey = await this.configService.get("SECRET_KEY");
            const tokenExpiration = "3h";
            const verificationToken = this.jwtService.sign({sub: addedUser.id}, {secret: secretKey, expiresIn: tokenExpiration});

            await this.accRegService.sendMail({
                email: addedUser.email,
                name: addedUser.name,
                token: verificationToken
            });
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async verifyAccount(token: string) {
        try {
            const secretKey = await this.configService.get("SECRET_KEY");
            const result = <{exp: number, sub: string; iat: number}>this.jwtService.verify(token, {secret: secretKey});

            const existingUser = await this.userRepo.find(result.sub);
            existingUser.accountStatus = AccountStatus.VERIFIED;

            
            await this.userRepo.update(existingUser);
            return "Account verified";
        }
        catch(error) {
            throw new UnauthorizedException("Invalid token");
        }
    }

    async forgotPassword(email: string) {
        try {
            const existingUser = await this.userRepo.find(email);

            if (!existingUser) {
                throw new BadRequestException("Email doesn't exist");
            }

            const tokenDuration = "3h";
            const secretKey = this.configService.get("SECRET_KEY");
            const generatedToken = this.jwtService.sign({sub: existingUser.id}, {expiresIn: tokenDuration, secret: secretKey});

            await this.forgotPasswordService.sendMail({
                email: existingUser.email,
                name: existingUser.name,
                token: generatedToken
            });

            return "Check your email to complete your password reset";
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async resetPassword(password: string, token: string) {
        try {
            const result = <{sub: string, exp: number, iat: number}>this.jwtService.verify(token, {secret: this.secretKey});
            const existingUser = await this.userRepo.find(result.sub);

            if (!existingUser) {
                throw new Error();
            }

            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);

            existingUser.password = hashedPassword;
            await this.userRepo.update(existingUser);

            return "Password changed successfully";
        }
        catch(error) {
            throw new BadRequestException("Invalid token");
        }
    }
}
