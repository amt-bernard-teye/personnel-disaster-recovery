import { Injectable } from '@nestjs/common';
import { PersonnelRepository } from 'src/database/repository/personnel.repository';

import { ProjectRepository } from 'src/database/repository/project.repository';
import { User } from 'src/shared/interface/user.interface';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepo: ProjectRepository,
    private personnelRepo: PersonnelRepository
  ) { }

  async findAll(page: number, wantAll: boolean) {
    try {
      const projects = await this.projectRepo.findAll(page, wantAll);
      const count = await this.projectRepo.count();

      return {count, projects};
    }
    catch(error) {
      throwException(error);
    }
  }

  async create(title: string, description: string, user: User) {
    try {
      const existingPersonnel = await this.personnelRepo.findByUserId(user.id);
      const project = await this.projectRepo.add({
        title, 
        description,
        personnelId: existingPersonnel.id
      });

      return project;
    }
    catch(error) {
      throwException(error);
    }
  }
}
