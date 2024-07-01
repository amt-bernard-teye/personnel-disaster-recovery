import { AccountStatus, PrismaClient, Role } from "@prisma/client";
import { Injectable } from "@nestjs/common";

import { User, UserProp } from "src/shared/interface/user.interface";
import { BaseRepository } from "./base.repository";
import { ISingleFinder } from "../interface/single-finder.interface";

@Injectable()
export class UserRepository extends BaseRepository<User, UserProp> implements ISingleFinder<string, User> {
    selectProps(): UserProp {
        return {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            accountStatus: true
        };
    }

    private async generateId(preferredRole: Role, prisma: PrismaClient) {
        const totalUserWithRole = await prisma.user.count({
            where: {
                role: preferredRole
            }
        });

        const initial = preferredRole === Role.ADMIN ? "ADM" : "PSL";
        return initial + (totalUserWithRole + 1);
    }

    async add(entity: User): Promise<User> {
        const prisma = this.open();
        const generatedId = await this.generateId(entity.role, prisma);

        const addedUser = await prisma.user.create({
            data: {
                id: generatedId,
                name: entity.name,
                email: entity.email,
                password: entity.password,
                role: entity.role,
                accountStatus: entity.accountStatus
            },
            select: this.selectProps()
        });

        await this.close();
        return addedUser;
    }

    async update(entity: User): Promise<User> {
        const prisma = this.open();
        
        const updatedUser = await prisma.user.update({
            where: {
                id: entity.id
            },
            data: {
                name: entity.name,
                password: entity.password,
                accountStatus: entity.accountStatus,
                image: entity.image,
                email: entity.email
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const prisma = this.open();

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                accountStatus: AccountStatus.SUSPENDED
            }
        });

        await this.close();
    }

    async find(value: string): Promise<User> {
        const prisma = this.open();

        const updatedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {id: value},
                    {email: value}
                ]
            }
        });

        await this.close();
        return updatedUser;
    }
}