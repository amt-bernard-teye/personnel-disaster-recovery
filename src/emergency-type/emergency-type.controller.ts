import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
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

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('emergency-types')
@ApiTags("Emergency Type")
export class EmergencyTypeController {
    constructor(private emergencyTypeService: EmergencyTypeService) {}

    @Get()
    @Roles([Role.ADMIN, Role.PERSONNEL])
    @UseGuards(RolesGuard)
    @UseInterceptors(DataOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerFetchEmergencySuccess)
    async findAll(@Query("page") page: string) {
        let parsedPage = +page;

        if (Number.isNaN(parsedPage)) {
            parsedPage = 0;
        }

        return await this.emergencyTypeService.findAll(parsedPage);
    }
    
    @Post()
    @Roles([Role.ADMIN])
    @UseGuards(RolesGuard)
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
}
