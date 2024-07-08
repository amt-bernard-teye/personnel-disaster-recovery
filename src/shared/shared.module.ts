import { Global, Module } from '@nestjs/common';

import { DataMessageInterceptor } from './interceptors/data-message.interceptor';
import { MessageOnlyInterceptor } from './interceptors/message-only.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { DataOnlyInterceptor } from './interceptors/data-only.interceptor';
import { AwsS3Service } from './service/aws-s3.service';
import { RolesGuard } from './guards/roles.guard';

@Global()
@Module({
    providers: [
        DataMessageInterceptor,
        DataOnlyInterceptor,
        MessageOnlyInterceptor,
        AuthGuard,
        AwsS3Service,
        RolesGuard
    ],
    exports: [
        DataMessageInterceptor,
        DataOnlyInterceptor,
        MessageOnlyInterceptor,
        AuthGuard,
        AwsS3Service,
        RolesGuard
    ]
})
export class SharedModule {}
