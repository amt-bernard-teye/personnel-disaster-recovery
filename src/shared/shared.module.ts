import { Global, Module } from '@nestjs/common';

import { DataMessageInterceptor } from './interceptors/data-message.interceptor';
import { MessageOnlyInterceptor } from './interceptors/message-only.interceptor';
import { AuthGuard } from './auth.guard';
import { DataOnlyInterceptor } from './interceptors/data-only.interceptor';

@Global()
@Module({
    providers: [
        DataMessageInterceptor,
        DataOnlyInterceptor,
        MessageOnlyInterceptor,
        AuthGuard
    ],
    exports: [
        DataMessageInterceptor,
        DataOnlyInterceptor,
        MessageOnlyInterceptor,
        AuthGuard
    ]
})
export class SharedModule {}
