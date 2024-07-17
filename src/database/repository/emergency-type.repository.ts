import { Injectable } from "@nestjs/common";
import { EmergencyTypeStatus } from "@prisma/client";

import { EmergencyType, EmergencyTypeProp } from "src/shared/interface/emergency-type.interface";
import { BaseRepository } from "./base.repository";
import { ISingleFinder } from "../interface/single-finder.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";
import { ISearchable } from "../interface/searchable.interface";
import { IDeleteEntity } from "../interface/delete-entity.interface";

@Injectable()
export class EmergencyTypeRepository extends BaseRepository<EmergencyType, EmergencyTypeProp>
    implements ISingleFinder<number | string, EmergencyType>, IMultipleFinder<EmergencyType>, ISearchable<EmergencyType>, IDeleteEntity {
    selectProps(): EmergencyTypeProp {
        return {
            id: true,
            name: true,
            status: true
        };
    }

    async add(entity: EmergencyType): Promise<EmergencyType> {
        const prisma = this.open();
        
        const addedEmergency = await prisma.emergencyType.create({
            data: {
                name: entity.name,
            },
            select: this.selectProps()
        });

        await this.close();

        return addedEmergency;
    }

    async update(entity: EmergencyType): Promise<EmergencyType> {
        const prisma = this.open();
        
        const updatedEmergency = await prisma.emergencyType.update({
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

        return updatedEmergency;
    }

    async delete(id: number): Promise<void> {
        const prisma = this.open();

        await prisma.emergencyType.update({
            where: {
                id: id
            },
            data: {
                status: EmergencyTypeStatus.REMOVED
            }
        });

        await this.close();
    }

    async find(value: number | string): Promise<EmergencyType> {
        const prisma = this.open();
        const filter = typeof value === "number" ? {id: value} : {name: value};

        const emergencyType = await prisma.emergencyType.findFirst({
            where: {
                ...filter
            },
            select: this.selectProps()
        });

        await this.close();

        return emergencyType;
    }

    async findAll(page: number, wantAll: boolean = false): Promise<EmergencyType[]> {
        const prisma = this.open();

        const rows = 9;
        let emergencyTypes: EmergencyType[] = [];

        if (wantAll) {
            emergencyTypes = await prisma.emergencyType.findMany({
                select: this.selectProps()
            });
        }
        else {
            emergencyTypes = await prisma.emergencyType.findMany({
                skip: page * rows,
                take: rows,
                select: this.selectProps()
            });
        }

        await this.close();

        return emergencyTypes;
    }

    async count(): Promise<number> {
        const prisma = this.open();

        const rows = await prisma.emergencyType.count();
        
        await this.close();

        return rows;
    }

    async search(value: string): Promise<EmergencyType[]> {
        const prisma = this.open();

        const emergencies = await prisma.emergencyType.findMany({
            where: {
                name: {
                    contains: value,
                    mode: "insensitive"
                }
            },
            select: this.selectProps()
        });

        await this.close();

        return emergencies;
    }
}