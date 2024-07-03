import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class ChangePersonalInfoDto {
    @IsNotEmpty()
    @Matches(/^[a-zA-Z ]*/)
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
}