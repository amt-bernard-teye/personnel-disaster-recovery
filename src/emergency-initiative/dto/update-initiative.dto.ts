import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsIn, IsNotEmpty, IsNumber } from "class-validator"

export class UpdateInitiativeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  dispatched_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsIn(["LOW", "MEDIUM", "HIGH"])
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  managerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  emergencyTypeId: number;
}