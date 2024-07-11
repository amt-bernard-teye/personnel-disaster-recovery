import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export function throwException(error: BadRequestException) {
    if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
    }

    throw new InternalServerErrorException("Something went wrong");
}