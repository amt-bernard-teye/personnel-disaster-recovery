import { BadRequestException, Injectable } from '@nestjs/common';

import { PersonnelRepository } from 'src/database/repository/personnel.repository';
import { ProfessionRespository } from 'src/database/repository/profession.repository';
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
    private userRepo: UserRepository
  ) {}

  async findAll(page: number, wantAll: boolean) {
    try {
      const personnel = await this.personnelRepo.findAll(page, wantAll);
      const count = await this.personnelRepo.count();

      return {count, personnel};
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

      return await this.personnelRepo.add({
        ...personnel,
        educationalBackground: educationalBackground,
        personnelProfession: persProfession
      });
    }
    catch(error) {
      throwException(error);
    }
  }
}
