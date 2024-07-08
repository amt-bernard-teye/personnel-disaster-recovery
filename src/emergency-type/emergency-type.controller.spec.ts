import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyTypeController } from './emergency-type.controller';

describe('EmergencyTypeController', () => {
  let controller: EmergencyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmergencyTypeController],
    }).compile();

    controller = module.get<EmergencyTypeController>(EmergencyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
