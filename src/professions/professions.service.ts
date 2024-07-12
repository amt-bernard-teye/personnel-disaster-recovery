import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AvailabilityStatus } from '@prisma/client';

import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';
import { ProfessionRespository } from 'src/database/repository/profession.repository';
import { Profession } from 'src/shared/interface/profession.interface';
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
            
            if (existingEmergency) {
                throw new BadRequestException("Emergency alread exist");
            }

            return await this.professionRepo.add({name, emergencyId: existingEmergency.id});
        }
        catch(error) {
            throwException(error);
        }
    }

    async update(id: number, profession: Profession) {
        try {
            const existingProfession = await this.professionRepo.find(id);
            const existingEmergency = await this.emergencyTypeRepo.find(profession.emergencyId);
            
            if (!existingProfession) {
                throw new BadRequestException("Profession doesn't exist");
            }

            if (!existingEmergency) {
                throw new BadRequestException("Emergency doesn't exist");
            }

            existingProfession.emergencyId = profession.emergencyId,
            existingProfession.name = profession.name;

            return await this.professionRepo.update(existingProfession);
        }
        catch(error) {
            throwException(error);
        }
    }

    async delete(id: number) {
        try {
            const existingProfession = await this.professionRepo.find(id);

            if (!existingProfession || existingProfession.status === AvailabilityStatus.AVAILABLE) {
                throw new BadRequestException("Profession doesn't exist");
            }

            await this.professionRepo.delete(id);

            return "Profession deleted successfully";
        }
        catch(error) {
            throwException(error);
        }
    }
}
