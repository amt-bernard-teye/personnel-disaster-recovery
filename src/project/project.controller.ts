import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { pageParser } from 'src/shared/util/page-parser.util';

@Controller('projects')
@UseGuards(AuthGuard)
@Roles([Role.PERSONNEL])
@ApiBearerAuth()
@ApiTags("Projects")
export class ProjectController {
  constructor(
    private projectService: ProjectService
  ) {}

  @Get()
  @UseInterceptors(DataOnlyInterceptor)
  findAll(@Query("page") page: string, @Query("want") want: string) {
    let parsedPage = pageParser(page);
    let wantAll = false;

    if (want === "all") {
      wantAll = true;
    }

    return this.projectService.findAll(parsedPage, wantAll);
  }
}
