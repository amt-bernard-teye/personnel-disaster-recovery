import { AvailabilityStatus } from "@prisma/client";

export type Profession = {
    id?: number;
    name: string;
    status?: AvailabilityStatus,
    created_at?: Date;
}

export type ProfessionProp = {
    id: boolean;
    name: boolean;
    status?: boolean,
    created_at: boolean;
}