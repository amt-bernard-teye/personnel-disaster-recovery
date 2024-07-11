import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';
import { ProfessionRespository } from 'src/database/repository/profession.repository';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class ProfessionsService {
    constructor(
        private professionRepo: ProfessionRespository,
        private emergencyTypeRepo: EmergencyTypeRepository
    ) { }

    async findAll(page: number) {
        try {
            const count = await this.professionRepo.count();
            const professions = await this.professionRepo.findAll(page);

            return { count, professions };
        }
        catch(error) {
            throw new InternalServerErrorException("Something went wrong");
        }
    }

    async create(name: string, emergencyId: number) {
        try {
            const existingEmergency = await this.emergencyTypeRepo.find(emergencyId);
            
            if (!existingEmergency) {
                throw new BadRequestException("Selected emergency doesn't exist");
            }

            const addedProfession = await this.professionRepo.add({name, emergencyId: existingEmergency.id});
            return addedProfession;
        }
        catch(error) {
            throwException(error);
        }
    }
}
