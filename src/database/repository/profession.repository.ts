import { Injectable } from "@nestjs/common";

import { AvailabilityStatus } from "@prisma/client";
import { Profession, ProfessionProp } from "src/shared/interface/profession.interface";
import { BaseRepository } from "./base.repository";
import { ISingleFinder } from "../interface/single-finder.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";
import { IDeleteEntity } from "../interface/delete-entity.interface";

@Injectable()
export class ProfessionRespository extends BaseRepository<Profession, ProfessionProp>
    implements ISingleFinder<number, Profession>, IMultipleFinder<Profession>, IDeleteEntity {
    selectProps(): ProfessionProp {
        return {
            id: true,
            name: true,
            emergencyId: true,
            status: true
        }
    }

    async add(entity: Profession): Promise<Profession> {
        const prisma = this.open();

        const addedProfession = await prisma.profession.create({
            data: {
                name: entity.name,
                emergencyId: entity.emergencyId
            },
            select: this.selectProps()
        });

        await this.close();

        return addedProfession;
    }

    async update(entity: Profession): Promise<Profession> {
        const prisma = this.open();

        const updatedProfession = await prisma.profession.update({
            where: {
                id: entity.id
            },
            data: {
                name: entity.name,
                emergencyId: entity.emergencyId,
                status: entity.status
            }
        });

        await this.close();

        return updatedProfession;
    }

    async delete(id: number): Promise<void> {
        const prisma = this.open();

        await prisma.profession.update({
            where: {
                id: id
            },
            data: {
                status: AvailabilityStatus.UNAVAILABLE
            }
        });

        await this.close();
    }

    async find(entityId: number): Promise<Profession> {
        const prisma = this.open();

        const profession = await prisma.profession.findFirst({
            where: {
                id: entityId
            },
            select: this.selectProps()
        });

        await this.close();

        return profession;
    }

    async findAll(page: number): Promise<Profession[]> {
        const prisma = this.open();

        const rows = 9;

        const professions = await prisma.profession.findMany({
            skip: rows * page,
            take: rows,
            select: this.selectProps()
        });

        await this.close();

        return professions;
    }

    async findOnlyAvailable(): Promise<Profession[]> {
        const prisma = this.open();

        const professions = await prisma.profession.findMany({
            where: {
                status: AvailabilityStatus.AVAILABLE
            }
        });

        await this.close();

        return professions;
    }

    async count(): Promise<number> {
        const prisma = this.open();

        const rows = await prisma.profession.count();

        await this.close();

        return rows;
    }
}