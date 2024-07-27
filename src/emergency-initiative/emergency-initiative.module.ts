import { Module } from '@nestjs/common';
import { EmergencyInitiativeController } from './emergency-initiative.controller';

@Module({
  controllers: [EmergencyInitiativeController]
})
export class EmergencyInitiativeModule {}
