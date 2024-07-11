import { Global, Module } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';
import { PersonnelRepository } from './repository/personnel.repository';
import { EmergencyTypeRepository } from './repository/emergency-type.repository';
import { ProfessionRespository } from './repository/profession.repository';

@Global()
@Module({
    providers: [
        UserRepository,
        PersonnelRepository,
        EmergencyTypeRepository,
        ProfessionRespository
    ],
    exports: [
        UserRepository,
        PersonnelRepository,
        EmergencyTypeRepository,
        ProfessionRespository
    ]
})
export class DatabaseModule {}
