import { Controller, Get, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from 'src/shared/auth.guard';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerActiveSuccess } from './swagger/active.swagger';

@Controller('users')
export class UsersController {
    @Get("logged-in")
    @UseGuards(AuthGuard)
    @UseInterceptors(DataOnlyInterceptor)
    @ApiTags("Users")
    @ApiBearerAuth()
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerActiveSuccess)
    loggedInUser(@Req() request: Request) {
        const {password, ...user} = request["user"];
        return user;
    }
}
