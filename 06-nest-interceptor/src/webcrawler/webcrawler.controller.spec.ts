import { Test, TestingModule } from '@nestjs/testing';
import { WebcrawlerController } from './webcrawler.controller';
import { WebcrawlerService } from './webcrawler.service';

describe('WebcrawlerController', () => {
  let controller: WebcrawlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebcrawlerController],
      providers: [WebcrawlerService],
    }).compile();

    controller = module.get<WebcrawlerController>(WebcrawlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
