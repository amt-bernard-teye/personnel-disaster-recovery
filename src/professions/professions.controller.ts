import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
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
    find(@Query("page") page: string) {
        const parsedPage = pageParser(page);
        return this.professionsService.findAll(parsedPage);
    }

    @Post()
    @ResponseMessage("Profession was added successfully")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCreateProfessionSuccess)
    @ApiResponse(swaggerCreateProfessionValidationError)
    create(@Body(ValidationPipe) body: ProfessionDto) {
        return this.professionsService.create(body.name, +body.emergencyId);
    }
}
