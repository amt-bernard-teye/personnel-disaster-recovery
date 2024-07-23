import { AvailabilityStatus, Gender, PersonnelStatus } from "@prisma/client";
import { EducationalBackground } from "./educational-background.interface";
import { PersonnelProfession } from "./personnel-profession.interface";

export type Personnel = {
    id?: number;
    phoneNumber: string;
    houseNumber: string;
    gender: Gender;
    dob: Date;
    town: string;
    digitalAddress: string;
    userId: string;
    status?: PersonnelStatus;
    availability?: AvailabilityStatus;
    professionId?: number;
    educationalBackground?: EducationalBackground,
    personnelProfession?: PersonnelProfession
}

export type PersonnelProp = {
    id: boolean;
    phoneNumber: boolean;
    houseNumber: boolean;
    gender: boolean;
    dob: boolean;
    town: boolean;
    digitalAddress: boolean;
    userId: boolean;
    status: boolean;
    availability: boolean;
}