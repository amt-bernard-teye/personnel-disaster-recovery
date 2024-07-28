import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';

import { EmergencyInitiativeRepository } from 'src/database/repository/emergency-initiative.repository';
import { EmergencyTypeRepository } from 'src/database/repository/emergency-type.repository';
import { InitiativePersonnelRepository } from 'src/database/repository/initiative-personnel.repository';
import ManagerRepository from 'src/database/repository/manager.repository';
import { PersonnelRepository } from 'src/database/repository/personnel.repository';
import { ProfessionRespository } from 'src/database/repository/profession.repository';
import { EmergencyInitiative } from 'src/shared/interface/emergency-initiative.interface';
import { User } from 'src/shared/interface/user.interface';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class EmergencyInitiativeService {
  constructor(
    private emergencyInitiativeRepo: EmergencyInitiativeRepository,
    private managerRepo: ManagerRepository,
    private emergencyTypeRepo: EmergencyTypeRepository,
    private professionRepo: ProfessionRespository,
    private initiativePersonnelRepo: InitiativePersonnelRepository,
    private personnelRepo: PersonnelRepository
  ) {}

  async findAll(page: number, user: User) {
    try {
      let initiatives: EmergencyInitiative[] = [];
      let count = 0;

      if (user.role === Role.ADMIN) {
        initiatives = await this.emergencyInitiativeRepo.findAll(page);
        count = await this.emergencyInitiativeRepo.count();
      }
      else {
        const existingPersonnel = await this.personnelRepo.findByUserId(user.id);

        initiatives = await this.emergencyInitiativeRepo.findAllByProfessionAndState(page, existingPersonnel.professionId, existingPersonnel.currentState);
        count = await this.emergencyInitiativeRepo.countByProfessionAndState(existingPersonnel.professionId, existingPersonnel.currentState);
      }

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

        if (!existingProfession || existingProfession.status === "UNAVAILABLE") {
          throw new BadRequestException("Profession doesn't exist");
        }
      }

      const existingManager = await this.managerRepo.find(initiative.managerId);

      if (!existingManager || existingManager.status === "UNAVAILABLE") {
        throw new BadRequestException("Manager doesn't exist");
      }

      const existingEmergencyType = await this.emergencyTypeRepo.find(initiative.emergencyTypeId);

      if (!existingEmergencyType) {
        throw new BadRequestException("Emergency type doesn't exist");
      }
      
      return await this.emergencyInitiativeRepo.add(initiative);
    }
    catch(error) {
      throwException(error);
    }
  }

  async approve(initiativeId: number, userId: string) {
    try {
      const personnel = await this.personnelRepo.findByUserId(userId);

      const existingInitiative = await this.emergencyInitiativeRepo.find(initiativeId);

      if (!existingInitiative) {
        throw new BadRequestException("Initiative doesn't exist");
      }
      
      await this.initiativePersonnelRepo.add({
        emergencyInitiativeId: initiativeId,
        personnelId: personnel.id
      });

      return "You have been successfully added to the list";
    }
    catch(error) {
      throwException(error);
    }
  }
}
