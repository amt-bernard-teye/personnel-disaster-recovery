import { AvailabilityStatus } from "@prisma/client";

export type Profession = {
    id?: number;
    name: string;
    status?: AvailabilityStatus
}

export type ProfessionProp = {
    id: boolean;
    name: boolean;
    status?: boolean
}