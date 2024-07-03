import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from 'src/shared/auth.guard';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerActiveSuccess } from './swagger/active.swagger';
import { ChangePersonalInfoDto } from './dto/change-personal-info.dto';
import { UsersService } from './users.service';
import { User } from 'src/shared/interface/user.interface';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { ChangeEmailDto } from './dto/change-email.dto';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { swaggerCheckEmailSuccess, swaggerCheckEmailValidationError } from './swagger/check-email.swagger';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

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

    @Post("personal")
    @UseGuards(AuthGuard)
    @ResponseMessage("Successfully updated personal info")
    @UseInterceptors(DataMessageInterceptor)
    @ApiTags("Users")
    @ApiBearerAuth()
    @ApiResponse(swaggerInternalError)
    changePersonalInfo(@Req() request: Request, @Body() body: ChangePersonalInfoDto) {
        const user = <User>request["user"];
        return this.usersService.changePersonalInfo(body.name, body.email, user);
    }

    @Post("check-email")
    @UseGuards(AuthGuard)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Users")
    @ApiBearerAuth()
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCheckEmailSuccess)
    @ApiResponse(swaggerCheckEmailValidationError)
    checkEmail(@Req() request: Request, @Body() body: ChangeEmailDto) {
        const user = <User>request["user"];
        return this.usersService.checkEmail(body.email, user);
    }
}
