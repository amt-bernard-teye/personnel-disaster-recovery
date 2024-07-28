import { Injectable } from "@nestjs/common";

import { EmergencyInitiative, EmergencyInitiativeProp } from "src/shared/interface/emergency-initiative.interface";
import { BaseRepository } from "./base.repository";
import { IMultipleFinder } from "../interface/multiple-finder.interface";

@Injectable()
export class EmergencyInitiativeRepository extends BaseRepository<EmergencyInitiative, EmergencyInitiativeProp>
  implements IMultipleFinder<EmergencyInitiative> {
  selectProps(): EmergencyInitiativeProp {
    return {
      id: true,
      created_at: true,
      dispatched_date: true,
      location: true,
      emergencyType: true,
      description: true,
      manager: true,
      end_date: true,
      state: true
    }
  }

  async add(entity: EmergencyInitiative): Promise<EmergencyInitiative> {
    const prisma = this.open();

    const addedEmergencyInitiative = await prisma.emergencyInitiative.create({
      data: {
        ...this.getData(entity),
        emergencyInitiativeProfession: {
          createMany: {
            data: entity.emergencyInitiativeProfession
          }
        }
      },
      select: this.selectProps()
    });

    await this.close();

    return addedEmergencyInitiative;
  }

  private getData(entity: EmergencyInitiative) {
    return {
      description: entity.description,
      dispatched_date: entity.dispatched_date,
      end_date: entity.end_date,
      location: entity.location,
      state: entity.state,
      managerId: entity.managerId,
      emergencyTypeId: entity.emergencyTypeId
    };
  }

  async update(entity: EmergencyInitiative): Promise<EmergencyInitiative> {
    const prisma = this.open();

    const updatedEmergencyInitiative = await prisma.emergencyInitiative.update({
      where: {
        id: entity.id
      },
      data: this.getData(entity),
      select: this.selectProps()
    });

    await this.close();

    return updatedEmergencyInitiative;
  }

  async findAll(page: number, wantAll: boolean = false): Promise<EmergencyInitiative[]> {
    const prisma = this.open();

    const row = 9;
    const emergencyInitiatives = await prisma.emergencyInitiative.findMany({
      skip: row * page,
      take: row,
      select: this.selectProps()
    });

    await this.close();

    return emergencyInitiatives;
  }

  async count(): Promise<number> {
    const prisma = this.open();

    const rows = await prisma.emergencyInitiative.count();

    await this.close();

    return rows;
  }
}