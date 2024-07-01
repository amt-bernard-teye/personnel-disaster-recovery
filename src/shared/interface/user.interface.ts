import { AccountStatus, Role } from "@prisma/client";

export type User = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    image?: string;
    role: Role;
    accountStatus: AccountStatus;
}

export type UserProp = {
    id: boolean;
    name: boolean;
    email: boolean;
    image: boolean;
    role: boolean;
    accountStatus: boolean;
}