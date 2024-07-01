import { Global, Module } from '@nestjs/common';

import { DataMessageInterceptor } from './interceptors/data-message.interceptor';
import { MessageOnlyInterceptor } from './interceptors/message-only.interceptor';

@Global()
@Module({
    providers: [
        DataMessageInterceptor,
        MessageOnlyInterceptor
    ],
    exports: [
        DataMessageInterceptor,
        MessageOnlyInterceptor
    ]
})
export class SharedModule {}
