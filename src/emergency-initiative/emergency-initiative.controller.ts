import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
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
import { Request } from 'express';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { swaggerApproveInitiativeSuccess, swaggerApproveInitiativeValidationError } from './swagger/approve-initiatve.swagger';

@Controller('emergency-initiatives')
@UseGuards(RolesGuard)
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Emergency Initiative")
export class EmergencyInitiativeController {
  constructor(
    private emergencyInitiativeService: EmergencyInitiativeService
  ) {}

  @Get()
  @Roles([Role.ADMIN])
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
  @Roles([Role.ADMIN])
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

  @Post(":id/approve")
  @Roles([Role.PERSONNEL])
  @UseInterceptors(MessageOnlyInterceptor)
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerApproveInitiativeSuccess)
  @ApiResponse(swaggerApproveInitiativeValidationError)
  approve(@Param("id", ValidationPipe) id: string, @Req() req: Request) {
    const user = req['user'];

    return this.emergencyInitiativeService.approve(+id, user.id);
  }
}
