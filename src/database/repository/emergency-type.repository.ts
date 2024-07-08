import { Injectable } from "@nestjs/common";
import { EmergencyTypeStatus } from "@prisma/client";

import { EmergencyType, EmergencyTypeProp } from "src/shared/interface/emergency-type.interface";
import { BaseRepository } from "./base.repository";
import { ISingleFinder } from "../interface/single-finder.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";
import { ISearchable } from "../interface/searchable.interface";

@Injectable()
export class EmergencyTypeRepository extends BaseRepository<EmergencyType, EmergencyTypeProp>
    implements ISingleFinder<number | string, EmergencyType>, IMultipleFinder<EmergencyType>, ISearchable<EmergencyType> {
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
                name: entity.name
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

        const emergencyType = await prisma.emergencyType.findFirst({
            where: {
                OR: [
                    {id: +value},
                    {name: value.toString()},
                ]
            },
            select: this.selectProps()
        });

        await this.close();

        return emergencyType;
    }

    async findAll(page: number, rows: number): Promise<EmergencyType[]> {
        const prisma = this.open();

        const emergencyTypes = await prisma.emergencyType.findMany({
            skip: page * rows,
            take: rows,
            select: this.selectProps()
        });

        await this.close();

        return emergencyTypes;
    }

    async count(): Promise<number> {
        const prisma = this.open();

        const rows = await prisma.user.count();
        
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