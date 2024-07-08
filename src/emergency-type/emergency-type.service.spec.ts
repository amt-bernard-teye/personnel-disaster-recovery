import { Test, TestingModule } from '@nestjs/testing';
import { EmergencyTypeService } from './emergency-type.service';

describe('EmergencyTypeService', () => {
  let service: EmergencyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmergencyTypeService],
    }).compile();

    service = module.get<EmergencyTypeService>(EmergencyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
