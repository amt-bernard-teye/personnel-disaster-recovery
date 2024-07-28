import { BadRequestException, Injectable } from '@nestjs/common';

import { EmergencyInitiativeRepository } from 'src/database/repository/emergency-initiative.repository';
import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';
import ManagerRepository from 'src/database/repository/manager.repository';
import { ProfessionRespository } from 'src/database/repository/profession.repository';
import { EmergencyInitiative } from 'src/shared/interface/emergency-initiative.interface';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class EmergencyInitiativeService {
  constructor(
    private emergencyInitiativeRep: EmergencyInitiativeRepository,
    private managerRepo: ManagerRepository,
    private emergencyTypeRepo: EmergencyTypeRepository,
    private professionRepo: ProfessionRespository
  ) {}

  async findAll(page: number) {
    try {
      const initiatives = await this.emergencyInitiativeRep.findAll(page);
      const count = await this.emergencyInitiativeRep.count();

      return {count, initiatives};
    }
    catch(error) {
      throwException(error);
    }
  }

  async create(initiative: EmergencyInitiative) {
    try {
      for (let value of initiative.emergencyInitiativeProfession) {
        let existingProfession = await this.professionRepo.find(value.professionId);

        if (!existingProfession) {
          throw new BadRequestException("Profession doesn't exist");
        }
      }

      const existingManager = await this.managerRepo.find(initiative.managerId);

      if (!existingManager) {
        throw new BadRequestException("Manager doesn't exist");
      }

      const existingEmergencyType = await this.emergencyTypeRepo.find(initiative.emergencyTypeId);

      if (!existingEmergencyType) {
        throw new BadRequestException("Emergency type doesn't exist");
      }
      
      return await this.emergencyInitiativeRep.add(initiative);
    }
    catch(error) {
      throwException(error);
    }
  }
}
