import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';

@Injectable()
export class EmergencyTypeService {
    constructor(private emergencyTypeRepo: EmergencyTypeRepository) {}

    async create(name: string) {
        try {
            const existingType = await this.emergencyTypeRepo.find(name);

            if (existingType) {
                throw new BadRequestException("Emergency type already exist");
            }

            return await this.emergencyTypeRepo.add({
                name: name
            });
        }
        catch(error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
