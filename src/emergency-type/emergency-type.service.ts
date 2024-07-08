import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';

@Injectable()
export class EmergencyTypeService {
    constructor(private emergencyTypeRepo: EmergencyTypeRepository) {}

    async create(name: string) {
        try {
            return await this.emergencyTypeRepo.add({
                name: name
            });
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }
}
