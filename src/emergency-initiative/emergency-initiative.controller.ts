import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { EmergencyInitiativeService } from './emergency-initiative.service';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { pageParser } from 'src/shared/util/page-parser.util';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerFetchInitiativeSuccess } from './swagger/fetch-initiative.swagger';

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
}
