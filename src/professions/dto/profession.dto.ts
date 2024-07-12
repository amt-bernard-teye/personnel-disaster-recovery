import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Matches } from "class-validator";

export class ProfessionDto {
    @IsNotEmpty()
    @ApiProperty()
    @Matches(/^[a-zA-Z ]*$/)
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    emergencyId: string;
}