import { EducationalBackground, EducationalBackgroundProp } from "src/shared/interface/educational-background.interface";
import { BaseRepository } from "./base.repository";

export class EducationalBackgroundRespository extends BaseRepository<EducationalBackground, EducationalBackgroundProp> {
    selectProps(): EducationalBackgroundProp {
        return {
            personnelId: true,
            qualification: true,
            studyField: true,
            graduationYear: true,
        };
    }

    async add(entity: EducationalBackground): Promise<EducationalBackground> {
        const prisma = this.open();

        const addedEducationBackground = await prisma.educationalBackground.create({
            data: {
                graduationYear: entity.graduationYear,
                qualification: entity.qualification,
                studyField: entity.studyField,
                personnelId: entity.personnelId
            },
            select: this.selectProps()
        });

        await this.close();

        return addedEducationBackground;
    }

    async update(entity: EducationalBackground): Promise<EducationalBackground> {
        const prisma = this.open();

        const updatedEducationBackground = await prisma.educationalBackground.update({
            where: {
                id: entity.id
            },
            data: {
                graduationYear: entity.graduationYear,
                qualification: entity.qualification,
                studyField: entity.studyField,
                personnelId: entity.personnelId
            },
            select: this.selectProps()
        });

        await this.close();

        return updatedEducationBackground;
    }
}