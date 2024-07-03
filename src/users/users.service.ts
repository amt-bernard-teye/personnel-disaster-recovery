import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from 'src/database/repository/user.repository';
import { User } from 'src/shared/interface/user.interface';

@Injectable()
export class UsersService {

    constructor(
        private userRepo: UserRepository
    ) { }

    async changePersonalInfo(name: string, email: string, existingUser: User) {
        try {
            const fetchedUser = await this.userRepo.find(email);

            if (fetchedUser && fetchedUser.email !== existingUser.email) {
                throw new BadRequestException("Email already exist");
            }

            existingUser.name = name;
            existingUser.email = email;

            const updatedUser = await this.userRepo.update(existingUser);
            const {password, ...user} = updatedUser;

            return user;
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async checkEmail(email: string, user: User) {
        try {
            const fetchedUser = await this.userRepo.find(email);

            if (fetchedUser && fetchedUser.email !== user.email) {
                throw new BadRequestException("Email already exist, try a different one");
            }

            return "Email doesn't exist, you are free to use it";
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
