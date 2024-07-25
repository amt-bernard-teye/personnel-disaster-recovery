import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { ManagerService } from './manager.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { pageParser } from 'src/shared/util/page-parser.util';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@Controller('managers')
@UseGuards(RolesGuard)
@Roles([Role.ADMIN])
@UseGuards(AuthGuard)
@ApiTags("Manager")
@ApiBearerAuth()
export class ManagerController {
  constructor(
    private managerService: ManagerService
  ) { }

  @Get()
  @UseInterceptors(DataOnlyInterceptor)
  findAll(@Query("page") page: string, @Query("want") want: string) {
    let parsedPage = pageParser(page);
    let wantAll = false;

    if (want === "all") {
      wantAll = true;
    }

    return this.managerService.findAll(parsedPage, wantAll);
  }
}
