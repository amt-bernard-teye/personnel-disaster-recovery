import { Injectable } from "@nestjs/common";

import { EmergencyInitiative, EmergencyInitiativeProp } from "src/shared/interface/emergency-initiative.interface";
import { BaseRepository } from "./base.repository";
import { IMultipleFinder } from "../interface/multiple-finder.interface";
import { ISingleFinder } from "../interface/single-finder.interface";
import { State } from "@prisma/client";

@Injectable()
export class EmergencyInitiativeRepository extends BaseRepository<EmergencyInitiative, EmergencyInitiativeProp>
  implements IMultipleFinder<EmergencyInitiative>, ISingleFinder<number, EmergencyInitiative> {
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

  async find(entityId: number): Promise<EmergencyInitiative> {
    const prisma = this.open();

    const initiative = await prisma.emergencyInitiative.findFirst({
      where: {
        id: entityId
      },
      select: {
        ...this.selectProps(),
        emergencyInitiativePersonnel: {
          select: {
            personnel: {
              select: {
                gender: true,
                phoneNumber: true,
                digitalAddress: true,
                dob: true,
                town: true,
                educationalBackground: true,
                user: {
                  select: {
                    name: true,
                    email: true,
                    image: true,
                  }
                }
              },
              
            }
          }
        }
      }
    });

    await this.close();

    return initiative;
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

  async findAllByProfessionAndState(page: number, professionId: number, state: State): Promise<EmergencyInitiative[]> {
    const prisma = this.open();

    const row = 9;
    const initiatives = await prisma.emergencyInitiative.findMany({
      skip: row * page,
      take: row,
      where: {
        state: state,
        emergencyInitiativeProfession: {
          every: {
            professionId: professionId
          }
        }
      },
      select: this.selectProps()
    });

    await this.close();

    return initiatives;
  }

  async countByProfessionAndState(professionId: number, state: State): Promise<number> {
    const prisma = this.open();

    const count = await prisma.emergencyInitiative.count({
      where: {
        state: state,
        emergencyInitiativeProfession: {
          every: {
            professionId: professionId
          }
        }
      }
    });

    await this.close();

    return count;
  }
}