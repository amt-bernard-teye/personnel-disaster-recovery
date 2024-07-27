import { Global, Module } from '@nestjs/common';

import { UserRepository } from './repository/user.repository';
import { PersonnelRepository } from './repository/personnel.repository';
import { EmergencyTypeRepository } from './repository/emergency-type.repository';
import { ProfessionRespository } from './repository/profession.repository';
import { ProjectRepository } from './repository/project.repository';
import ManagerRepository from './repository/manager.repository';
import { EmergencyInitiativeRepository } from './repository/emergency-initiative.repository';

@Global()
@Module({
    providers: [
        UserRepository,
        PersonnelRepository,
        EmergencyTypeRepository,
        ProfessionRespository,
        ProjectRepository,
        ManagerRepository,
        EmergencyInitiativeRepository
    ],
    exports: [
        UserRepository,
        PersonnelRepository,
        EmergencyTypeRepository,
        ProfessionRespository,
        ProjectRepository,
        ManagerRepository,
        EmergencyInitiativeRepository
    ]
})
export class DatabaseModule {}
