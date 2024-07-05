import { BadRequestException, Body, Controller, Get, HttpCode, Post, Query, Req, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { swaggerLoginSuccess, swaggerLoginValidationError } from './swagger/login.swagger';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';
import { RegisterDto } from './dto/register.dto';
import { MessageOnlyInterceptor } from 'src/shared/interceptors/message-only.interceptor';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ReSendMailDto } from './dto/resend-mail.dto';
import { swaggerRegisterSuccess, swaggerRegisterValidationError } from './swagger/register.swagger';
import { swaggerInternalError } from 'src/shared/swagger/internal-error.swagger';
import { swaggerReSendMailSuccess, swaggerReSendMailValidationError } from './swagger/re-send.swagger';
import { swaggerAccountVerificationSuccess, swaggerAccountVerificationValidationError } from './swagger/account-verification.swagger';
import { swaggerForgotPasswordSuccess, swaggerForgotPasswordValidationError } from './swagger/forgot-passowrd.swagger';
import { swaggerResetPasswordSuccess, swaggerResetPasswordValidationError } from './swagger/reset-password.swagger';
import { swaggerCheckEmailSuccess, swaggerCheckEmailValidationError } from 'src/auth/dto/check-email.swagger';
import { ChangeEmailDto } from './dto/change-email.dto';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    @ResponseMessage("Access granted")
    @HttpCode(200)
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerLoginSuccess)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerLoginValidationError)
    async login(@Body(ValidationPipe) body: LoginDto) {
        return await this.authService.login(body.email, body.password);
    }

    @Post("register")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerRegisterSuccess)
    @ApiResponse(swaggerRegisterValidationError)
    async register(@Body(ValidationPipe) body: RegisterDto) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        await this.authService.register(body);
        return "Please check your email to complete your registration";
    }

    @Get("account-verification")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerAccountVerificationSuccess)
    @ApiResponse(swaggerAccountVerificationValidationError)
    async accountVerification(@Query("token") token: string) {
        return await this.authService.verifyAccount(token);
    }

    @Post("forgot-password")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerForgotPasswordSuccess)
    @ApiResponse(swaggerForgotPasswordValidationError)
    async forgotPassword(@Body(ValidationPipe) body: ForgotPasswordDto) {
        return await this.authService.forgotPassword(body.email);
    }

    @Post("reset-password")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiTags("Auth")
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerResetPasswordSuccess)
    @ApiResponse(swaggerResetPasswordValidationError)
    async resetPassword(@Body(ValidationPipe) body: ResetPasswordDto, @Query("token") token: string) {
        if (body.password !== body.confirmPassword) {
            throw new BadRequestException("Passwords do not match each other");
        }

        return await this.authService.resetPassword(body.password, token);
    }

    @Post("re-send-mail")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerReSendMailSuccess)
    @ApiResponse(swaggerReSendMailValidationError)
    async reSendMail(@Body(ValidationPipe) body: ReSendMailDto) {
        return await this.authService.reSendMail(body.email);
    }

    @Post("check-email")
    @HttpCode(200)
    @UseInterceptors(MessageOnlyInterceptor)
    @ApiResponse(swaggerInternalError)
    @ApiResponse(swaggerCheckEmailSuccess)
    @ApiResponse(swaggerCheckEmailValidationError)
    checkEmail(@Body(ValidationPipe) body: ChangeEmailDto) {
        return this.authService.checkEmail(body.email);
    }
}
