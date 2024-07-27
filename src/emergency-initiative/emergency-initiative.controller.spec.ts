import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyInitiativeController } from './emergency-initiative.controller';

describe('EmergencyInitiativeController', () => {
  let controller: EmergencyInitiativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyInitiativeController],
    }).compile();

    controller = module.get<EmergencyInitiativeController>(EmergencyInitiativeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
