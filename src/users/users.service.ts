import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { unlink } from 'fs/promises';

import { UserRepository } from 'src/database/repository/user.repository';
import { User } from 'src/shared/interface/user.interface';
import { AwsS3Service } from 'src/shared/service/aws-s3.service';

@Injectable()
export class UsersService {

    constructor(
        private userRepo: UserRepository,
        private awsS3Service: AwsS3Service,
        private configService: ConfigService
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

    async changeImage(file: Express.Multer.File, user: User) {
        try {
            const fileKey = file.fieldname + Date.now();
            const result = await this.awsS3Service.sendFile(file, fileKey);
            const bucketName = this.configService.get("AWS_BUCKET_NAME");
            const region = this.configService.get("AWS_REGION");
            let imagePath = "";
            let successCode = 200;

            if (result.$metadata.httpStatusCode === successCode) {
                imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
            } else {
                throw new Error();
            }

            if (user.image) {
                await this.awsS3Service.deleteFile(user.image);
            }

            user.image = imagePath;
            await this.userRepo.update(user);

            return "Image uploaded";
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong, please try again");
        }
    }
}
