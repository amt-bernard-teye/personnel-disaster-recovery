import { Body, Controller, Post, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { EmergencyTypeDto } from './dto/emergency-type.dto';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { EmergencyTypeService } from './emergency-type.service';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { RolesGuard } from 'src/shared/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Roles([Role.ADMIN])
@UseGuards(RolesGuard)
@Controller('emergency-types')
export class EmergencyTypeController {
    constructor(private emergencyTypeService: EmergencyTypeService) {}

    @Post()
    @ResponseMessage("Added emergency type successfully")
    @UseInterceptors(DataMessageInterceptor)
    async create(@Body(ValidationPipe) body: EmergencyTypeDto) {
        return await this.emergencyTypeService.create(body.name);
    }

    
}
