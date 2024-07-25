import { ApiProperty } from "@nestjs/swagger";
import { CreateManagerDto } from "./create-manager.dto";

export class ManagerDto extends CreateManagerDto {
  @ApiProperty({type: "string", format: "binary"})
  image: Express.Multer.File
}