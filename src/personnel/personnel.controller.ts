import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreatePersonnel } from './dto/create-personnel.dto';
import { PersonnelService } from './personnel.service';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { Personnel } from 'src/shared/interface/personnel.interface';
import { CurrentPosition, Gender, Role } from '@prisma/client';
import { EducationalBackground } from 'src/shared/interface/educational-background.interface';
import { PersonnelProfession } from 'src/shared/interface/personnel-profession.interface';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { pageParser } from 'src/shared/util/page-parser.util';

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
  @UseInterceptors(DataMessageInterceptor)
  @ResponseMessage("Successfully saved")
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

  @Put(":id")
  update() {

  }

  @Delete(":id")
  delete() {

  }
}
