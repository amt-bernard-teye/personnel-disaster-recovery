import { AvailabilityStatus } from "@prisma/client";

export type Profession = {
    id?: number;
    name: string;
    emergencyId: number;
    status?: AvailabilityStatus
}

export type ProfessionProp = {
    id: boolean;
    name: boolean;
    emergencyId: boolean;
    status?: boolean
}