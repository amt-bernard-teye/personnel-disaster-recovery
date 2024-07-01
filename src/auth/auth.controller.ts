import { Body, Controller, HttpCode, Post, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { swaggerLoginSuccess, swaggerLoginValidationError } from './swagger/login.swagger';
import { ResponseMessage } from 'src/shared/decorators/response-message.decorator';
import { DataMessageInterceptor } from 'src/shared/interceptors/data-message.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    @ResponseMessage("Access granted")
    @HttpCode(200)
    @UseInterceptors(DataMessageInterceptor)
    @ApiResponse(swaggerLoginSuccess)
    @ApiResponse(swaggerLoginValidationError)
    @ApiTags("Auth")
    async login(@Body() body: LoginDto) {
        return await this.authService.login(body.email, body.password);
    }
}
