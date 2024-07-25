import { Body, Controller, Get, Post, Query, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { pageParser } from 'src/shared/util/page-parser.util';
import ProjectDto from './dto/project.dto';
import { Request } from 'express';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerFetchProjectSuccess } from './swagger/fetch-project.swagger';
import { swaggerCreateProjectSuccess, swaggerCreateProjectValidationError } from './swagger/create-project.swagger';

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
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerFetchProjectSuccess)
  findAll(@Query("page") page: string, @Query("want") want: string) {
    let parsedPage = pageParser(page);
    let wantAll = false;

    if (want === "all") {
      wantAll = true;
    }

    return this.projectService.findAll(parsedPage, wantAll);
  }

  @Post()
  @UseInterceptors(DataMessageInterceptor)
  @ResponseMessage("Project created successfully")
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerCreateProjectSuccess)
  @ApiResponse(swaggerCreateProjectValidationError)
  create(@Body(ValidationPipe) body: ProjectDto, @Req() req: Request, ) {
    const user = req['user'];

    return this.projectService.create(
      body.title,
      body.description,
      user
    );
  }


}
