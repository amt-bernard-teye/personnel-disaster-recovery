import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class CreateManagerDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/)
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}