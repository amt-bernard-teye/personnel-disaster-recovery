import { PersonnelStatus, Role } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import { Personnel, PersonnelProp } from "src/shared/interface/personnel.interface";
import { ISingleFinder } from "../interface/single-finder.interface";
import { IMultipleFinder } from "../interface/multiple-finder.interface";
import { User } from "src/shared/interface/user.interface";

export class PersonnelRepository extends BaseRepository<Personnel, PersonnelProp>
    implements ISingleFinder<number, Personnel>, IMultipleFinder<User> {
    selectProps(): PersonnelProp {
        return {
            id: true,
            availability: true,
            digitalAddress: true,
            dob: true,
            gender: true,
            houseNumber: true,
            phoneNumber: true,
            status: true,
            town: true,
            userId: true,
        };
    }

    async add(entity: Personnel): Promise<Personnel> {
        const prisma = this.open();

        const addedPersonnel = await prisma.personnel.create({
            data: {
                ...this.getData(entity),
                educationalBackground: {
                    create: {
                        graduationYear: entity.educationalBackground.graduationYear,
                        qualification: entity.educationalBackground.qualification,
                        studyField: entity.educationalBackground.studyField
                    }
                },
                personnelProfession: {
                    create: {
                        currrentPosition: entity.personnelProfession.currentPosition,
                        employee_id: entity.personnelProfession.employeeId,
                        employer_email: entity.personnelProfession.employeeEmail,
                        employer_name: entity.personnelProfession.employerName,
                        experienceYears: entity.personnelProfession.experienceYears
                    }
                }
            },
            select: this.selectProps()
        });

        await this.close();

        return addedPersonnel;
    }

    private getData(entity: Personnel) {
        return {
            digitalAddress: entity.digitalAddress,
            gender: entity.gender,
            dob: entity.dob,
            houseNumber: entity.houseNumber,
            phoneNumber: entity.phoneNumber,
            town: entity.town,
            userId: entity.userId,
            professionId: entity.professionId
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

    async findAll(page: number, wantAll: boolean = false): Promise<User[]> {
        const prisma = this.open();

        const rows = 9;
        const result = this.fetchAllProps();
        const personnels = await prisma.user.findMany({
            where: {
                role: Role.PERSONNEL,
                personnel: {
                    isNot: null
                }
            },
            skip: rows * page,
            take: rows,
            select: {
                ...result,
                personnel: {
                    select: {
                        status: true,
                        created_at: true,
                        profession: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        console.log(personnels);

        await this.close();

        return personnels;
    }

    fetchAllProps() {
        return {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true
        };
    }

    async count(): Promise<number> {
        const prisma = this.open();

        const rows = await prisma.user.count({
            where: {
                role: Role.PERSONNEL,
                personnel: {
                    isNot: null
                }
            },
        });

        await this.close();

        return rows;
    }
}