import { Injectable } from '@nestjs/common';
import ManagerRepository from 'src/database/repository/manager.repository';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class ManagerService {
  constructor(
    private managerRepo: ManagerRepository
  ) { }

  async findAll(page: number, wantAll: boolean) {
    try {
      const managers = await this.managerRepo.findAll(page, wantAll);
      const count = await this.managerRepo.count();

      return {count, managers};
    }
    catch(error) {
      throwException(error);
    }
  }
}
