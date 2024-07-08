import { IsNotEmpty, Matches } from "class-validator";

export class EmergencyTypeDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z ]*$/)
    name: string;
}