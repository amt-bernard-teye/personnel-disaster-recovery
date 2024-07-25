import { Injectable } from '@nestjs/common';

import { ProjectRepository } from 'src/database/repository/project.repository';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class ProjectService {
  constructor(
    private projectRepo: ProjectRepository
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
}
