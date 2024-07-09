import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';

@Injectable()
export class EmergencyTypeService {
    constructor(private emergencyTypeRepo: EmergencyTypeRepository) {}

    async findAll(page: number) {
        try {
            const emergencies = await this.emergencyTypeRepo.findAll(page);
            const rows = await this.emergencyTypeRepo.count();

            return {
                count: rows,
                emergencyTypes: emergencies
            };
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

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
            this.throwException(error);
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    private throwException(error: BadRequestException) {
        if (error instanceof BadRequestException) {
            throw new BadRequestException(error.message);
        }
    }

    async update(name: string, id: number) {
        try {
            const existingType = await this.emergencyTypeRepo.find(id);

            if (!existingType) {
                throw new BadRequestException("Emergency type already exist");
            }

            existingType.name = name;

            return await this.emergencyTypeRepo.update(existingType);
        }
        catch(error) {
            this.throwException(error);
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async delete(id: number) {
        try {
            await this.emergencyTypeRepo.delete(id);
            return "Emergency type deleted successfully";
        }
        catch(error) {
            this.throwException(error);
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
