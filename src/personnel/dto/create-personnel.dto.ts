import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsIn, IsNotEmpty, IsNumber, Matches } from "class-validator";

export class CreatePersonnel {
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/)
  @ApiProperty()
  phoneNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  houseNumber: string;

  @IsNotEmpty()
  @IsIn(["MALE", "FEMALE"])
  @ApiProperty()
  gender: string;

  @IsNotEmpty()
  @ApiProperty()
  dob: string

  @IsNotEmpty()
  @ApiProperty()
  town: string;

  @IsNotEmpty()
  @ApiProperty()
  digitalAddress: string;

  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsNotEmpty()
  @ApiProperty()
  employeeId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  experienceYears: number;

  @IsNotEmpty()
  @ApiProperty()
  employerName: string;

  @IsNotEmpty()
  @ApiProperty()
  employerEmail: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  professionId: number;

  @IsNotEmpty()
  @IsIn(["JUNIOR", "ASSOCIATE", "EXPERT"])
  @ApiProperty()
  currentPosition: string;

  @IsNotEmpty()
  @ApiProperty()
  qualification: string;

  @IsNotEmpty()
  @ApiProperty()
  studyField: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  graduationYear: number;
}