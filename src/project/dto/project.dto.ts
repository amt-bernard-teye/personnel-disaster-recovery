import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export default class ProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
}