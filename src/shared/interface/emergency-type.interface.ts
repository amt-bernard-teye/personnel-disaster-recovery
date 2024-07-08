import { EmergencyTypeStatus } from "@prisma/client";

export type EmergencyType = {
    id?: number;
    name: string;
    status: EmergencyTypeStatus
}

export type EmergencyTypeProp = {
    id: boolean;
    name: boolean;
    status: boolean;
}