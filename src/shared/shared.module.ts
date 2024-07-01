import { Global, Module } from '@nestjs/common';
import { DataMessageInterceptor } from './interceptors/data-message.interceptor';

@Global()
@Module({
    providers: [
        DataMessageInterceptor
    ],
    exports: [
        DataMessageInterceptor
    ]
})
export class SharedModule {}
