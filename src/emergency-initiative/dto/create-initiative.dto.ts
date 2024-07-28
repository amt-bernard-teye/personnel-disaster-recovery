import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsIn, IsNotEmpty, IsNumber } from "class-validator";

import { EmergencyInitiativeProfession } from "src/shared/interface/emergency-initiative-profession.interface";

export class CreateInitiativeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  dispatched_date: string;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNumber()
  emergencyTypeId: number;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  managerId: number;

  @ApiProperty()
  @IsDateString()
  end_date: string;
  
  @ApiProperty()
  @IsIn(["LOW", "MEDIUM", "HIGH"])
  state: string;

  @ApiProperty({
    example: [
      { professionId: 1, number: 1 },
      { professionId: 12, number: 10 },
    ]
  })
  @IsArray()
  professions: EmergencyInitiativeProfession[];
}