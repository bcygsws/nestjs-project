import { Test, TestingModule } from '@nestjs/testing';
import { WebcrawlerService } from './webcrawler.service';

describe('WebcrawlerService', () => {
  let service: WebcrawlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebcrawlerService],
    }).compile();

    service = module.get<WebcrawlerService>(WebcrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
