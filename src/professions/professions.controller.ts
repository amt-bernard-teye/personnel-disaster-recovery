import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('professions')
@ApiTags("Professions")
export class ProfessionsController {}
