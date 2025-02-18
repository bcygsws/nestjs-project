import { Test, TestingModule } from '@nestjs/testing';
import { XiaomanService } from './xiaoman.service';

describe('XiaomanService', () => {
  let service: XiaomanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XiaomanService],
    }).compile();

    service = module.get<XiaomanService>(XiaomanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
