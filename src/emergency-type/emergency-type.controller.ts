import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { EmergencyTypeDto } from './dto/emergency-type.dto';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { EmergencyTypeService } from './emergency-type.service';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { swaggerCreateEmergencySuccess } from './swagger/create-emergency.swagger';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { swaggerFetchEmergencySuccess } from './swagger/fetch-emergency.swagger';
import { swaggerUpdateEmergencySuccess, swaggerUpdateEmergencyValidationError } from './swagger/update-emergency.swagger';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { swaggerDeleteEmergencySuccess, swaggerDeleteEmergencyValidationError } from './swagger/delete-emergency.swagger';
import { pageParser } from 'src/shared/util/page-parser.util';

@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles([Role.ADMIN])
@Controller('emergency-types')
@ApiTags("Emergency Type")
export class EmergencyTypeController {
    constructor(private emergencyTypeService: EmergencyTypeService) {}

    @Get()
    @UseInterceptors(DataOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerFetchEmergencySuccess)
    async findAll(@Query("page") page: string, @Query("want") want: string) {
        let parsedPage = pageParser(page);
        let selectedWant = <"all" | "rows">want;

        if (!selectedWant) {
            throw new BadRequestException("Indicate whether you want 'rows' or 'all'");
        }
        
        return await this.emergencyTypeService.findAll(parsedPage, selectedWant);
    }
    
    @Post()
    @ResponseMessage("Added emergency type successfully")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCreateEmergencySuccess)
    async create(@Body(ValidationPipe) body: EmergencyTypeDto) {
        return await this.emergencyTypeService.create(body.name);
    }

    @Put(":id")
    @ResponseMessage("Updated emergency type successfully")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerUpdateEmergencySuccess)
    @ApiResponse(swaggerUpdateEmergencyValidationError)
    async update(@Param("id", ParseIntPipe) id: string, @Body(ValidationPipe) body: EmergencyTypeDto) {
        return await this.emergencyTypeService.update(body.name, +id);
    }

    @Delete(":id")
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerDeleteEmergencySuccess)
    @ApiResponse(swaggerDeleteEmergencyValidationError)
    async delete(@Param("id", ParseIntPipe) id: string) {
        return await this.emergencyTypeService.delete(+id);
    }
}
