import { EmergencyTypeStatus } from "@prisma/client";

export type EmergencyType = {
    id?: number;
    name: string;
    status?: EmergencyTypeStatus,
    created_at?: Date;
}

export type EmergencyTypeProp = {
    id: boolean;
    name: boolean;
    status: boolean;
    created_at: boolean;
}