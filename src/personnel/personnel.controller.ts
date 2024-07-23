import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePersonnel } from './dto/create-personnel.dto';
import { PersonnelService } from './personnel.service';
import { Personnel } from 'src/shared/interface/personnel.interface';
import { CurrentPosition, Gender, Role } from '@prisma/client';
import { EducationalBackground } from 'src/shared/interface/educational-background.interface';
import { PersonnelProfession } from 'src/shared/interface/personnel-profession.interface';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { pageParser } from 'src/shared/util/page-parser.util';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerDeletePersonnelSuccess, swaggerDeletePersonnelValidationError } from './swagger/delete-personnel.swagger';
import { swaggerFetchPersonnelnSuccess } from './swagger/fetch-personnel.swagger';
import { swaggerCreatePersonnelSuccess, swaggerCreatePersonnelValidationError } from './swagger/create-personnel.swagger';

@Controller('personnels')
@ApiTags("Personnel")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PersonnelController {
  constructor(
    private personnelService: PersonnelService
  ) { }

  @Get()
  @Roles([Role.ADMIN])
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerFetchPersonnelnSuccess)
  findAll(@Query("page") page: string, @Query("want") want: string) {
    let parsedPage = pageParser(page);
    let wantAll = false;

    if (want === "all") {
      wantAll = true;
    }

    return this.personnelService.findAll(parsedPage, wantAll);
  }
  
  @Post()
  @Roles([Role.PERSONNEL])
  @UseInterceptors(MessageOnlyInterceptor)
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerCreatePersonnelSuccess)
  @ApiResponse(swaggerCreatePersonnelValidationError)
  create(@Req() request: Request, @Body(ValidationPipe) body: CreatePersonnel) {
    const personnel: Personnel = {
      digitalAddress: body.digitalAddress,
      dob: new Date(body.dob),
      gender: <Gender>body.gender,
      houseNumber: body.houseNumber,
      phoneNumber: body.phoneNumber,
      professionId: body.professionId,
      town: body.town,
      userId: request['user']['id']
    };

    const educational: EducationalBackground = {
      graduationYear: body.graduationYear,
      qualification: body.qualification,
      studyField: body.studyField,
    };

    const personnelProfession: PersonnelProfession = {
      currentPosition: <CurrentPosition>body.currentPosition,
      employeeEmail: body.employerEmail,
      employeeId: body.employeeId,
      employerName: body.employerName,
      experienceYears: body.experienceYears
    }

    return this.personnelService.create(personnel, educational, personnelProfession);
  }

  @Delete(":id")
  @Roles([Role.ADMIN])
  @UseInterceptors(MessageOnlyInterceptor)
  @ApiResponse(swaggerInternalError)
  @ApiResponse(swaggerDeletePersonnelSuccess)
  @ApiResponse(swaggerDeletePersonnelValidationError)
  delete(@Param("id") id: string) {
    return this.personnelService.delete(id);
  }
}
