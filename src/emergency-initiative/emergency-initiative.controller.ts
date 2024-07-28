import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role, State } from '@prisma/client';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { EmergencyInitiativeService } from './emergency-initiative.service';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { pageParser } from 'src/shared/util/page-parser.util';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerFetchInitiativeSuccess } from './swagger/fetch-initiative.swagger';
import { CreateInitiativeDto } from './dto/create-initiative.dto';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { EmergencyInitiative } from 'src/shared/interface/emergency-initiative.interface';
import { swaggerCreateInitiativeSuccess, swaggerCreateInitiativeValidationError } from './swagger/create-initiative.swagger';
import { EmergencyInitiativeProfession } from 'src/shared/interface/emergency-initiative-profession.interface';

@Controller('emergency-initiatives')
@UseGuards(RolesGuard)
@Roles([Role.ADMIN])
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Emergency Initiative")
export class EmergencyInitiativeController {
  constructor(
    private emergencyInitiativeService: EmergencyInitiativeService
  ) {}

  @Get()
  @UseInterceptors(DataOnlyInterceptor)
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerFetchInitiativeSuccess)
  findAll(@Query("page") page: string, @Query("want") want: string) {
    let parsedPage = pageParser(page);
    let wantAll = false;

    if (want === "all") {
      wantAll = true;
    }

    return this.emergencyInitiativeService.findAll(parsedPage);
  }

  @Post()
  @UseInterceptors(DataMessageInterceptor)
  @ResponseMessage("Initiative added successfully")
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerCreateInitiativeSuccess)
  @ApiResponse(swaggerCreateInitiativeValidationError)
  create(@Body(ValidationPipe) body: CreateInitiativeDto) {
    let profession: EmergencyInitiativeProfession[] = body.professions.map(value => ({professionId: value, number: 1}))
    let initiative: EmergencyInitiative = {
      description: body.description,
      dispatched_date: new Date(body.dispatched_date),
      end_date: new Date(body.end_date),
      location: body.location,
      state: <State>body.state,
      managerId: body.managerId,
      emergencyTypeId: body.emergencyTypeId,
      emergencyInitiativeProfession: profession
    };

    return this.emergencyInitiativeService.create(initiative);
  }

}
