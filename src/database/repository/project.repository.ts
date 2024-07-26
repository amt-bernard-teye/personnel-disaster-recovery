import { Injectable } from "@nestjs/common";

import { IDeleteEntity } from "../interface/delete-entity.interface";
import { ISingleFinder } from "../interface/single-finder.interface";
import { BaseRepository } from "./base.repository";
import { Project, ProjectProp } from "src/shared/interface/project.interface";

@Injectable()
export class ProjectRepository extends BaseRepository<Project, ProjectProp>
  implements IDeleteEntity, ISingleFinder<number, Project>  {
  selectProps(): ProjectProp {
    return {
      id: true,
      created_at: true,
      description: true,
      title: true,
    }
  }

  async add(entity: Project): Promise<Project> {
    const prisma = this.open();
    
    const project = await prisma.project.create({
      data: {
        title: entity.title,
        description: entity.description,
        personnelId: entity.personnelId
      },
      select: this.selectProps()
    });

    await this.close();

    return project;
  }

  async update(entity: Project): Promise<Project> {
    const prisma = this.open();
    
    const updatedProject = await prisma.project.update({
      where: {
        id: entity.id
      },
      data: {
        title: entity.title,
        description: entity.description,
        personnelId: entity.personnelId
      },
      select: this.selectProps()
    });

    await this.close();

    return updatedProject;
  }

  async delete(id: number): Promise<void> {
    const prisma = this.open();

    await prisma.project.delete({
      where: {
        id: id
      },
    });

    await this.close();
  }

  async find(entityId: number): Promise<Project> {
    const prisma = this.open();

    const project = await prisma.project.findFirst({
      where: {
        id: entityId
      },
      select: {...this.selectProps(), personnelId: true}
    });

    await this.close();

    return project;
  }

  async findAll(page: number, personnelId: number) {
    const prisma = this.open();

    const rows = 9;
    const projects = await prisma.project.findMany({
      skip: page * rows,
      take: rows,
      where: {
        personnelId: personnelId
      },
      select: this.selectProps()
    });

    await this.close();

    return projects;
  }

  async count(personnel: number) {
    const prisma = this.open();

    const rows = await prisma.project.count({
      where: {
        personnelId: personnel
      }
    });

    await this.close();

    return rows;
  }
}