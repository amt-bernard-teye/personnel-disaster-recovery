import { AvailabilityStatus, Gender, PersonnelStatus } from "@prisma/client";

export type Personnel = {
    id?: number;
    phoneNumber: string;
    houseNumber: string;
    gender: Gender;
    dob: Date;
    town: string;
    digitalAddress: string;
    userId: string;
    image: string;
    status?: PersonnelStatus;
    availability?: AvailabilityStatus;
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
    image: boolean;
    status: boolean;
    availability: boolean;
}