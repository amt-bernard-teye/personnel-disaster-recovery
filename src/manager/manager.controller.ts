import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { ManagerService } from './manager.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { pageParser } from 'src/shared/util/page-parser.util';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { CreateManagerDto } from './dto/create-manager.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { changeImageValidator, imageUploadConfig } from 'src/users/image-uploader.multer';
import { ManagerDto } from './dto/manager.dto';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerCreateManagerSuccess, swaggerCreateManagerValidationError } from './swagger/create-manager.swagger';
import { swaggerFetchManagerSuccess } from './swagger/fetch-manager.swagger';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { swaggerDeleteManagerSuccess, swaggerDeleteManagerValidationError } from './swagger/delete-manager.swagger';
import { swaggerUpdateManagerSuccess, swaggerUpdateManagerValidationError } from './swagger/update-manager.swagger';

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
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerFetchManagerSuccess)
  findAll(@Query("page") page: string, @Query("want") want: string) {
    let parsedPage = pageParser(page);
    let wantAll = false;

    if (want === "all") {
      wantAll = true;
    }

    return this.managerService.findAll(parsedPage, wantAll);
  }

  @Post()
  @UseInterceptors(DataMessageInterceptor)
  @ResponseMessage("Manager added successfully")
  @UseInterceptors(FileInterceptor("image", imageUploadConfig))
  @ApiConsumes("multipart/form-data")
  @ApiBody({type: ManagerDto})
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerCreateManagerSuccess)
  @ApiResponse(swaggerCreateManagerValidationError)
  create(
    @UploadedFile(changeImageValidator) file: Express.Multer.File,
    @Body(ValidationPipe) body: CreateManagerDto
  ) {
    return this.managerService.create({
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber,
    }, file);
  }

  @Put(":id")
  @UseInterceptors(DataMessageInterceptor)
  @ResponseMessage("Manager updated successfully")
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerUpdateManagerSuccess)
  @ApiResponse(swaggerUpdateManagerValidationError)
  update(@Param("id", ValidationPipe) id: string, @Body(ValidationPipe) body: CreateManagerDto) {
    return this.managerService.update(+id, {
      email: body.email,
      name: body.name,
      phoneNumber: body.phoneNumber
    });
  }

  @Delete(":id")
  @UseInterceptors(MessageOnlyInterceptor)
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerDeleteManagerSuccess)
  @ApiResponse(swaggerDeleteManagerValidationError)
  delete(@Param("id", ValidationPipe) id: string) {
    return this.managerService.delete(+id);
  }
}
