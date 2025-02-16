import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ProfessionDto } from './dto/profession.dto';
import { ProfessionsService } from './professions.service';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { swaggerCreateProfessionSuccess, swaggerCreateProfessionValidationError } from './swagger/create-profession.swagger';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { pageParser } from 'src/shared/util/page-parser.util';
import { swaggerFetchProfessionSuccess } from './swagger/fetch-profession.swagger';
import { swaggerUpdateProfessionSuccess, swaggerUpdateProfessionValidationError } from './swagger/update-profession.swagger';
import { swaggerDeleteProfessionSuccess, swaggerDeleteProfessionValidationError } from './swagger/delete-profession.swagger';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';

@Controller('professions')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Profession")
export class ProfessionsController {
    constructor(private professionsService: ProfessionsService) { }

    @Get()
    @UseInterceptors(DataOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerFetchProfessionSuccess)
    find(@Query("page") page: string, @Query("want") want: string) {
        const parsedPage = pageParser(page);

        let wantAll = false;

        if (want === "all") {
            wantAll = true;
        }

        return this.professionsService.findAll(parsedPage, wantAll);
    }

    @Post()
    @ResponseMessage("Profession added successfully")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCreateProfessionSuccess)
    @ApiResponse(swaggerCreateProfessionValidationError)
    create(@Body(ValidationPipe) body: ProfessionDto) {
        return this.professionsService.create(body.name);
    }

    @Put(":id")
    @ResponseMessage("Profession updated successfully")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerUpdateProfessionSuccess)
    @ApiResponse(swaggerUpdateProfessionValidationError)
    update(@Param("id", ParseIntPipe) id: string, @Body(ValidationPipe) body: ProfessionDto) {
        return this.professionsService.update(+id, {
            name: body.name
        });
    }

    @Delete(":id")
    @ResponseMessage("Profession deleted successfully")
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerDeleteProfessionSuccess)
    @ApiResponse(swaggerDeleteProfessionValidationError)
    delete(@Param("id", ParseIntPipe) id: string) {
        return this.professionsService.delete(+id);
    }
}
