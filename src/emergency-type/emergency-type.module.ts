import { Module } from '@nestjs/common';
import { EmergencyTypeController } from './emergency-type.controller';
import { EmergencyTypeService } from './emergency-type.service';

@Module({
  controllers: [EmergencyTypeController],
  providers: [EmergencyTypeService]
})
export class EmergencyTypeModule {}
