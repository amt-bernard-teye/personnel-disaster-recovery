import { Module } from '@nestjs/common';
import { EmergencyTypeController } from './emergency-type.controller';

@Module({
  controllers: [EmergencyTypeController]
})
export class EmergencyTypeModule {}
