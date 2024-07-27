import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyInitiativeService } from './emergency-initiative.service';

describe('EmergencyInitiativeService', () => {
  let service: EmergencyInitiativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyInitiativeService],
    }).compile();

    service = module.get<EmergencyInitiativeService>(EmergencyInitiativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
