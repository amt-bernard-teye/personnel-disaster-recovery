import { Injectable } from "@nestjs/common";

import { Manager, ManagerProp } from "src/shared/interface/manager.interface";
import { BaseRepository } from "./base.repository";
import { IDeleteEntity } from "../interface/delete-entity.interface";
import { AvailabilityStatus } from "@prisma/client";
import { ISingleFinder } from "../interface/single-finder.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";

@Injectable()
export default class ManagerRepository extends BaseRepository<Manager, ManagerProp>
  implements IDeleteEntity, ISingleFinder<number, Manager>, IMultipleFinder<Manager> {
  selectProps(): ManagerProp {
    return {
      id: true,
      created_at: true,
      name: true,
      email: true,
      phoneNumber: true,
      image: true,
      status: true
    };
  }

  async add(entity: Manager): Promise<Manager> {
    const prisma = this.open();

    const manager = await prisma.manager.create({
      data: {
        name: entity.name,
        email: entity.email,
        image: entity.image,
        phoneNumber: entity.phoneNumber,
      },
      select: this.selectProps()
    });

    await this.close();

    return manager;
  }

  async update(entity: Manager): Promise<Manager> {
    const prisma = this.open();
    
    const updatedManager = await prisma.manager.update({
      where: {
        id: entity.id
      },
      data: {
        name: entity.name,
        email: entity.email,
        image: entity.image,
        phoneNumber: entity.phoneNumber,
        status: entity.status
      },
      select: this.selectProps()
    });

    await this.close();

    return updatedManager;
  }

  async delete(id: number): Promise<void> {
    const prisma = this.open();

    await prisma.manager.update({
      where: {
        id: id
      },
      data: {
        status: AvailabilityStatus.UNAVAILABLE
      }
    });

    await this.close();
  }

  async find(entityId: number): Promise<Manager> {
    const prisma = this.open();

    const manager = await prisma.manager.findFirst({
      where: {
        id: entityId,
      },
      select: this.selectProps()
    });

    await this.close();

    return manager;
  }

  async findAll(page: number, wantAll: boolean): Promise<Manager[]> {
    const prisma = this.open();

    const rows = 9;
    let managers: Manager[] = [];

    if (wantAll) {
      managers = await prisma.manager.findMany({
        select: this.selectProps()
      });
    }
    else {
      managers = await prisma.manager.findMany({
        skip: page * rows,
        take: rows,
        select: this.selectProps()
      });
    }

    await this.close();

    return managers;
  }

  async count(): Promise<number> {
    const prisma = this.open();

    const rows = await prisma.user.count();

    await this.close();

    return rows;
  }
}