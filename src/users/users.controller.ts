import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { AuthGuard } from 'src/shared/guards/auth.guard';
import { DataOnlyInterceptor } from 'src/shared/interceptors/data-only.interceptor';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerActiveSuccess } from './swagger/active.swagger';
import { ChangePersonalInfoDto } from './dto/change-personal-info.dto';
import { UsersService } from './users.service';
import { User } from 'src/shared/interface/user.interface';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { changeImageValidator, imageUploadConfig } from './image-uploader.multer';
import { swaggerCheckEmailSuccess, swaggerCheckEmailValidationError } from 'src/auth/dto/check-email.swagger';
import { ChangeEmailDto } from 'src/auth/dto/change-email.dto';
import { swaggerChangeImageSuccess, swaggerChangeImageValidationError } from './swagger/change-image.swagger';

@Controller('users')
@ApiBearerAuth()
@ApiTags("Users")
@UseGuards(AuthGuard)
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Get("logged-in")
    @UseInterceptors(DataOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerActiveSuccess)
    loggedInUser(@Req() request: Request) {
        const {password, ...user} = request["user"];
        return user;
    }

    @Post("personal")
    @ResponseMessage("Successfully updated personal info")
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerInternalError)
    changePersonalInfo(@Req() request: Request, @Body() body: ChangePersonalInfoDto) {
        const user = <User>request["user"];
        return this.usersService.changePersonalInfo(body.name, body.email, user);
    }

    @Post("check-email")
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCheckEmailSuccess)
    @ApiResponse(swaggerCheckEmailValidationError)
    checkEmail(@Req() request: Request, @Body() body: ChangeEmailDto) {
        const user = <User>request["user"];
        return this.usersService.checkEmail(body.email, user);
    }

    @Post("change-image")
    @UseInterceptors(FileInterceptor("image", imageUploadConfig))
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerChangeImageSuccess)
    @ApiResponse(swaggerChangeImageValidationError)
    async changeImage(
        @Req() request: Request,
        @UploadedFile(changeImageValidator) file: Express.Multer.File
    ) {
        const user = request["user"];
        return await this.usersService.changeImage(file, user);
    }
}
