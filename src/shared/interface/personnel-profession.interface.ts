import { CurrentPosition } from "@prisma/client";

export type PersonnelProfession = {
    employeeId: string;
    experienceYears: number;
    employerName: string;
    employeeEmail: string;
    personnelId: number;
    currentPosition: CurrentPosition;
}

export type PersonnelProfessionProp = {
    employeeId: boolean;
    experienceYears: boolean;
    employerName: boolean;
    employeeEmail: boolean;
    personnelId: boolean;
    currentPosition: boolean;
}