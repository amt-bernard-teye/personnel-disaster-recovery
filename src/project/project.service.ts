import { BadRequestException, Injectable } from '@nestjs/common';
import { PersonnelRepository } from 'src/database/repository/personnel.repository';

import { ProjectRepository } from 'src/database/repository/project.repository';
import { User } from 'src/shared/interface/user.interface';
import { throwException } from 'src/shared/util/handle-bad-request.util';
import { ProjectUpdateDetails } from './project-update-details.interface';
import { Personnel } from 'src/shared/interface/personnel.interface';
import { Project } from 'src/shared/interface/project.interface';

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

  async update(details: ProjectUpdateDetails, user: User) {
    try {
      const existingPersonnel = await this.personnelRepo.findByUserId(user.id);
      const existingProject = await this.projectRepo.find(details.id);

      this.checkIfUserOwnsProject(existingPersonnel, existingProject);

      existingProject.title = details.title,
      existingProject.description = details.description;

      const updatedProject = await this.projectRepo.update(existingProject);

      return updatedProject;
    }
    catch(error) {
      throwException(error);
    }
  }

  checkIfUserOwnsProject(existingPersonnel: Personnel, existingProject: Project) {
    if (existingPersonnel.id !== existingProject.personnelId) {
      throw new BadRequestException("Access denied");
    }
  }

  async delete(id: number, user: User) {
    try {
      const existingPersonnel = await this.personnelRepo.findByUserId(user.id);
      const existingProject = await this.projectRepo.find(id);

      if (!existingProject) {
        throw new BadRequestException("Project doesn't exist");
      }

      this.checkIfUserOwnsProject(existingPersonnel, existingProject)

      await this.projectRepo.delete(id);

      return "Project deleted successfully";
    }
    catch(error) {
      throwException(error);
    }
  }
}
