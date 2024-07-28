import { Injectable } from '@nestjs/common';

import { EmergencyInitiativeRepository } from 'src/database/repository/emergency-initiative.repository';
import { throwException } from 'src/shared/util/handle-bad-request.util';

@Injectable()
export class EmergencyInitiativeService {
  constructor(
    private emergencyInitiativeRep: EmergencyInitiativeRepository
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
}
