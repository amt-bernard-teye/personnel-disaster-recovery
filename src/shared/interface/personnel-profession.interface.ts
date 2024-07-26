import { CurrentPosition } from "@prisma/client";

export type PersonnelProfession = {
    employeeId: string;
    experienceYears: number;
    employerName: string;
    employerEmail: string;
    personnelId?: number;
    currentPosition: CurrentPosition;
}

export type PersonnelProfessionProp = {
    employeeId: boolean;
    experienceYears: boolean;
    employerName: boolean;
    employerEmail: boolean;
    personnelId: boolean;
    currentPosition: boolean;
}