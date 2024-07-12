import { EducationBackground, EducationBackgroundProp } from "src/shared/interface/educational-background.interface";
import { BaseRepository } from "./base.repository";

export class EducationalBackgroundRespository extends BaseRepository<EducationBackground, EducationBackgroundProp> {
    selectProps(): EducationBackgroundProp {
        return {
            personnelId: true,
            qualification: true,
            studyField: true,
            graduationYear: true,
        };
    }

    async add(entity: EducationBackground): Promise<EducationBackground> {
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

    async update(entity: EducationBackground): Promise<EducationBackground> {
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