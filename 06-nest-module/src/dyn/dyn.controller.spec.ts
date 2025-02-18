import { Test, TestingModule } from '@nestjs/testing';
import { DynController } from './dyn.controller';
import { DynService } from './dyn.service';

describe('DynController', () => {
  let controller: DynController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynController],
      providers: [DynService],
    }).compile();

    controller = module.get<DynController>(DynController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
