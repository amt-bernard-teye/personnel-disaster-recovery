import { Injectable } from "@nestjs/common";

import { Profession, ProfessionProp } from "src/shared/interface/profession.interface";
import { BaseRepository } from "./base.repository";
import { ISingleFinder } from "../interface/single-finder.interface";
import { AvailabilityStatus } from "@prisma/client";
import { IDeleteEntity } from "../interface/delete-entity.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";

@Injectable()
export class ProfessionRespository extends BaseRepository<Profession, ProfessionProp>
    implements ISingleFinder<number, Profession>, IDeleteEntity, IMultipleFinder<Profession> {
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

    async find(value: number | string): Promise<Profession> {
        const prisma = this.open();
        let profession: Profession | null = null;

        if (typeof value === "number") {
            profession = await prisma.profession.findFirst({
                where: {
                    id: value
                },
                select: this.selectProps()
            });
        }
        else {
            profession = await prisma.profession.findFirst({
                where: {
                    name: {
                        contains: value,
                        mode: "insensitive"
                    }
                },
                select: this.selectProps()
            });
        }

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

    async findAll(page: number = 0, wantAll: boolean = false): Promise<Profession[]> {
        const prisma = this.open();

        const rows = 9;
        let professions: Profession[] = [];

        if (wantAll) {
            professions = await prisma.profession.findMany({
                where: {
                    status: AvailabilityStatus.AVAILABLE
                },
                select: this.selectProps()
            });
        }
        else {
            professions = await prisma.profession.findMany({
                skip: page * rows,
                take: rows,
                where: {
                    status: AvailabilityStatus.AVAILABLE
                },
                select: this.selectProps()
            });
        }

        await this.close();

        return professions;
    }

    async count(): Promise<number> {
        const prisma = this.open();

        const rows = await prisma.profession.count({
            where: {
                status: AvailabilityStatus.AVAILABLE
            }
        });

        await this.close();

        return rows;
    }
}