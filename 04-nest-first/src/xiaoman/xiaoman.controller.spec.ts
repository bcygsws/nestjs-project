import { Test, TestingModule } from '@nestjs/testing';
import { XiaomanController } from './xiaoman.controller';
import { XiaomanService } from './xiaoman.service';

describe('XiaomanController', () => {
  let controller: XiaomanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XiaomanController],
      providers: [XiaomanService],
    }).compile();

    controller = module.get<XiaomanController>(XiaomanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
