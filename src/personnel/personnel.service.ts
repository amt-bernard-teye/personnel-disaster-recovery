import { BadRequestException, Injectable } from '@nestjs/common';

import { PersonnelRepository } from 'src/database/repository/personnel.repository';
import { ProfessionRespository } from 'src/database/repository/profession.repository';
import { ProjectRepository } from 'src/database/repository/project.repository';
import { UserRepository } from 'src/database/repository/user.repository';
import { EducationalBackground } from 'src/shared/interface/educational-background.interface';
import { PersonnelProfession } from 'src/shared/interface/personnel-profession.interface';
import { Personnel } from 'src/shared/interface/personnel.interface';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class PersonnelService {
  constructor(
    private personnelRepo: PersonnelRepository,
    private professionRepo: ProfessionRespository,
    private userRepo: UserRepository,
    private projectRepo: ProjectRepository
  ) {}

  async findAll(page: number, wantAll: boolean) {
    try {
      const personnels = await this.personnelRepo.findAll(page, wantAll);
      const formattedPersonnels = personnels.map(pers => {
        return {
          id: pers.id,
          name: pers.name,
          email: pers.email,
          image: pers.image,
          profession: pers['personnel']['profession']['name'],
          status: pers['personnel']['status'],
          createdAt: pers['personnel']['created_at']
        }
      });
      const count = await this.personnelRepo.count();

      return {count, personnel: formattedPersonnels};
    }
    catch(error) {
      throwException(error);
    }
  }

  async find(id: string) {
    try {
      const personnel = await this.personnelRepo.findByUserId(id);
      const totalProjects = await this.projectRepo.count(personnel.id);

      const updatedPersonnel = {
        ...personnel,
        totalProjects
      }

      return updatedPersonnel;
    }
    catch(error) {
      throwException(error);
    }
  }

  async create(personnel: Personnel, educationalBackground: EducationalBackground, persProfession: PersonnelProfession) {
    try {
      const existingProfession = await this.professionRepo.find(personnel.professionId);
      const existingUser = await this.userRepo.find(personnel.userId);

      if (!existingProfession || !existingUser) {
        throw new BadRequestException("Profession doesn't exist or your account isn't recognized");
      }

      await this.personnelRepo.add({
        ...personnel,
        educationalBackground: educationalBackground,
        personnelProfession: persProfession
      });

      return "Saved successfully";
    }
    catch(error) {
      throwException(error);
    }
  }

  async delete(id: string) {
    try {
      const existingUser = await this.userRepo.find(id);

      if (!existingUser) {
        throw new BadRequestException("Personnel doesn't exist");
      }

      await this.userRepo.delete(id);

      return "Personnel deleted successfully";
    }
    catch(error) {
      throwException(error);
    }
  }
}
