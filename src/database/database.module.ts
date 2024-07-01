import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';

@Global()
@Module({
    imports: [
        UserRepository
    ]
})
export class DatabaseModule {}
