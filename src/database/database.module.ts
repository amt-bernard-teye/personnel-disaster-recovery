import { Global, Module } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';
import { PersonnelRepository } from './repository/personnel.repository';
import { EmergencyTypeRepository } from './repository/emergency-type.repository';

@Global()
@Module({
    providers: [
        UserRepository,
        PersonnelRepository,
        EmergencyTypeRepository
    ],
    exports: [
        UserRepository,
        PersonnelRepository,
        EmergencyTypeRepository
    ]
})
export class DatabaseModule {}
