import { Injectable } from "@nestjs/common";

import { Profession, ProfessionProp } from "src/shared/interface/profession.interface";
import { BaseRepository } from "./base.repository";
import { ISingleFinder } from "../interface/single-finder.interface";
import { AvailabilityStatus } from "@prisma/client";
import { IDeleteEntity } from "../interface/delete-entity.interface";

@Injectable()
export class ProfessionRespository extends BaseRepository<Profession, ProfessionProp>
    implements ISingleFinder<number, Profession>, IDeleteEntity {
    selectProps(): ProfessionProp {
        return {
            id: true,
            name: true,
            status: true,
            created_at: true
        }
    }

    async add(entity: Profession): Promise<Profession> {
        const prisma = this.open();

        const addedProfession = await prisma.profession.create({
            data: {
                name: entity.name,
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
                status: entity.status
            },
            select: this.selectProps()
        });

        await this.close();

        return updatedProfession;
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

    async findAll(page: number = 0): Promise<Profession[]> {
        const prisma = this.open();

        const rows = 9;

        const professions = await prisma.profession.findMany({
            skip: page * rows,
            take: rows,
            where: {
                status: AvailabilityStatus.UNAVAILABLE
            },
            select: this.selectProps()
        });

        await this.close();

        return professions;
    }
}