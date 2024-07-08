import { PersonnelStatus } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import { Personnel, PersonnelProp } from "src/shared/interface/personnel.interface";
import { ISingleFinder } from "../interface/single-finder.interface";

export class PersonnelRepository extends BaseRepository<Personnel, PersonnelProp>
    implements ISingleFinder<number, Personnel> {
    selectProps(): PersonnelProp {
        return {
            id: true,
            availability: true,
            digitalAddress: true,
            dob: true,
            gender: true,
            houseNumber: true,
            image: true,
            phoneNumber: true,
            status: true,
            town: true,
            userId: true
        };
    }

    async add(entity: Personnel): Promise<Personnel> {
        const prisma = this.open();

        const addedPersonnel = await prisma.personnel.create({
            data: this.getData(entity),
            select: this.selectProps()
        });

        await this.close();

        return addedPersonnel;
    }

    private getData(entity: Personnel) {
        return {
            phoneNumber: entity.phoneNumber,
            digitalAddress: entity.digitalAddress,
            dob: entity.dob,
            gender: entity.gender,
            houseNumber: entity.houseNumber,
            image: entity.image,
            town: entity.town,
            userId: entity.userId
        };
    }

    async update(entity: Personnel): Promise<Personnel> {
        const prisma = this.open();

        const updatedPersonnel = await prisma.personnel.update({
            where: {
                id: entity.id,
            },
            data: this.getData(entity),
            select: this.selectProps()
        });

        await this.close();
        
        return updatedPersonnel;
    }

    async delete(id: number): Promise<void> {
        const prisma = this.open();

        await prisma.personnel.update({
            where: {
                id: id
            },
            data: {
                status: PersonnelStatus.DISAPPROVE
            }
        });

        await this.close();
    }

    async find(entityId: number): Promise<Personnel> {
        const prisma = this.open();

        const personnel = await prisma.personnel.findFirst({
            where: {
                id: entityId,
            },
            select: this.selectProps()
        });

        await this.close();

        return personnel;
    }
}