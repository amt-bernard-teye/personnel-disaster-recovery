import { BadRequestException, Injectable } from '@nestjs/common';

import ManagerRepository from 'src/database/repository/manager.repository';
import { AwsS3Service } from 'src/shared/service/aws-s3.service';
import { throwException } from 'src/shared/util/handle-bad-request.util';
import { CreateManager } from './interface/create-manager.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ManagerService {
  constructor(
    private managerRepo: ManagerRepository,
    private awsService: AwsS3Service,
    private configService: ConfigService
  ) { }

  async findAll(page: number, wantAll: boolean) {
    try {
      const managers = await this.managerRepo.findAll(page, wantAll);
      const count = await this.managerRepo.count();

      return {count, managers};
    }
    catch(error) {
      throwException(error);
    }
  }

  async create(manager: CreateManager, file: Express.Multer.File) {
    try {
      const existingManager = await this.managerRepo.find(manager.email);

      if (existingManager) {
        throw new BadRequestException("Email already in use by another manager");
      }

      const fileKey = file.fieldname + Date.now();
      const result = await this.awsService.sendFile(file, fileKey);
      const bucketName = this.configService.get("AWS_BUCKET_NAME");
      const region = this.configService.get("AWS_REGION");
      let imagePath = "";
      let successCode = 200;

      if (result.$metadata.httpStatusCode === successCode) {
        imagePath = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
      } else {
        throw new Error();
      }

      return await this.managerRepo.add({
        ...manager,
        image: imagePath
      });
    }
    catch(error) {
      throwException(error);
    }
  }

  async update(id: number, manager: CreateManager) {
    try {
      const existingManagerByEmail = await this.managerRepo.find(manager.email);
      const existingManager = await this.managerRepo.find(id);

      if (!existingManager || (existingManagerByEmail && existingManagerByEmail.id !== existingManager.id)) {
        throw new BadRequestException("Email already in use by another manager");
      }

      existingManager.name = manager.name;
      existingManager.phoneNumber = manager.phoneNumber;
      existingManager.email = manager.email;

      return await this.managerRepo.update(existingManager);
    }
    catch(error) {
      throwException(error);
    }
  }

  async delete(id: number) {
    try {
      const existingManager = await this.managerRepo.find(id);

      if (!existingManager) {
        throw new BadRequestException("Manager doesn't exist");
      }

      await this.managerRepo.delete(id);
      
      return "Manager deleted successfully";
    }
    catch(error) {
      throwException(error);
    }
  }
}
