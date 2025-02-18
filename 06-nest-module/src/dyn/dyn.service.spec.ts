import { Test, TestingModule } from '@nestjs/testing';
import { DynService } from './dyn.service';

describe('DynService', () => {
  let service: DynService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynService],
    }).compile();

    service = module.get<DynService>(DynService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
