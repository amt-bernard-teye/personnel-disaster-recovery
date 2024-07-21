import { PersonnelProfession, PersonnelProfessionProp } from "src/shared/interface/personnel-profession.interface";
import { BaseRepository } from "./base.repository";

export class PersonnelProfessionRepository extends BaseRepository<PersonnelProfession, PersonnelProfessionProp> {
    selectProps(): PersonnelProfessionProp {
        return {
            currentPosition: true,
            employeeEmail: true,
            employeeId: true,
            employerName: true,
            experienceYears: true,
            personnelId: true,
        };
    }

    async add(entity: PersonnelProfession): Promise<PersonnelProfession> {
        const prisma = this.open();
        
        const addedPersonnelProfession = await prisma.personnelProfession.create({
            data: {
                currrentPosition: entity.currentPosition,
                employee_id: entity.employeeId,
                employer_email: entity.employeeEmail,
                employer_name: entity.employerName,
                experienceYears: entity.experienceYears,
                personnelId: entity.personnelId
            },
            select: this.selectProps()
        });

        await this.close();

        return addedPersonnelProfession;
    }

    async update(entity: PersonnelProfession): Promise<PersonnelProfession> {
        const prisma = this.open();

        const updatedPersonnelProfession = await prisma.personnelProfession.update({
            where: {
                employee_id: entity.employeeId,
            },
            data: {
                currrentPosition: entity.currentPosition,
                employer_email: entity.employeeEmail,
                employer_name: entity.employerName,
                experienceYears: entity.experienceYears,
                personnelId: entity.personnelId
            },
            select: this.selectProps()
        });

        await this.close();

        return updatedPersonnelProfession;
    }
}