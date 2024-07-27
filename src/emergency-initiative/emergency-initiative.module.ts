import { Module } from '@nestjs/common';
import { EmergencyInitiativeController } from './emergency-initiative.controller';
import { EmergencyInitiativeService } from './emergency-initiative.service';

@Module({
  controllers: [EmergencyInitiativeController],
  providers: [EmergencyInitiativeService]
})
export class EmergencyInitiativeModule {}
