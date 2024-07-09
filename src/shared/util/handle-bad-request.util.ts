import { BadRequestException } from "@nestjs/common";

export function throwException(error: BadRequestException) {
    if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
    }
}