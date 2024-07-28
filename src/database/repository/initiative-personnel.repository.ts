import { Injectable } from "@nestjs/common";

import { EmergencyInitiativePersonnel, EmergencyInitiativePersonnelProp } from "src/shared/interface/emergency-initiative-personnel.interface";
import { BaseRepository } from "./base.repository";

@Injectable()
export class InitiativePersonnelRepository extends BaseRepository<EmergencyInitiativePersonnel, EmergencyInitiativePersonnelProp> {
  selectProps(): EmergencyInitiativePersonnelProp {
    return {
      emergencyInitiative: true,
      personnel: true
    }
  }

  async add(entity: EmergencyInitiativePersonnel): Promise<EmergencyInitiativePersonnel> {
    const prisma = this.open();

    const data = await prisma.emergencyIntiativePersonnel.create({
      data: {
        emergencyInitiativeId: entity.emergencyInitiativeId,
        personnelId: entity.personnelId
      },
      select: this.selectProps()
    });

    await this.close();

    return data;
  }

  async update(entity: EmergencyInitiativePersonnel): Promise<EmergencyInitiativePersonnel> {
    const prisma = this.open();

    const updatedData = await prisma.emergencyIntiativePersonnel.update({
      where: {
        id: entity.id
      },
      data: {}
    });

    await this.close();

    return updatedData;
  }

  async delete(initiativeId: number, personnelId: number): Promise<void> {
    const prisma = this.open();

    const existingData = await prisma.emergencyIntiativePersonnel.findFirst({
      where: {
        emergencyInitiativeId: initiativeId,
        personnelId: personnelId
      }
    });

    if (!existingData) {
      return;
    }

    await prisma.emergencyIntiativePersonnel.delete({
      where: {
        id: existingData.id
      }
    });

    await this.close();
  }
}