import { AvailabilityStatus, Gender, PersonnelStatus, State } from "@prisma/client";
import { EducationalBackground } from "./educational-background.interface";
import { PersonnelProfession } from "./personnel-profession.interface";
import { Profession } from "./profession.interface";
import { User } from "./user.interface";

export type Personnel = {
    id?: number;
    phoneNumber: string;
    houseNumber: string;
    gender: Gender;
    dob: Date;
    town: string;
    digitalAddress: string;
    currentState: State
    userId: string;
    status?: PersonnelStatus;
    availability?: AvailabilityStatus;
    professionId?: number;
    educationalBackground?: EducationalBackground,
    personnelProfession?: PersonnelProfession,
    profession?: Profession,
    user?: User
}

export type PersonnelProp = {
    id: boolean;
    phoneNumber: boolean;
    houseNumber: boolean;
    gender: boolean;
    dob: boolean;
    town: boolean;
    currentState: boolean;
    digitalAddress: boolean;
    userId: boolean;
    status: boolean;
    availability: boolean;
}