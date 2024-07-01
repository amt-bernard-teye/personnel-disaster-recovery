import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountStatus, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UserRepository } from 'src/database/repository/user.repository';

@Injectable()
export class SeedersService {
    constructor(
        private userRepo: UserRepository,
        private configService: ConfigService
    ) {}

    async createAdmin() {
        const name = this.configService.get("ADMIN_NAME");
        const email = this.configService.get("ADMIN_EMAIL");
        const password = this.configService.get("ADMIN_PASSWORD");

        try {
            const existingUser = await this.userRepo.find(email);

            if (existingUser) {
                return {message: "Admin already created"};
            }

            const hashedPassword = await hash(password, 10);
            await this.userRepo.add({
                name,
                password: hashedPassword,
                email,
                accountStatus: AccountStatus.VERIFIED,
                role: Role.ADMIN,
            });

            return {message: "Admin created"};
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
