import { Test, TestingModule } from '@nestjs/testing';
import { TutorialsController } from './tutorialsController';

describe('TutorialsController', () => {
  let controller: TutorialsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorialsController],
    }).compile();

    controller = module.get<TutorialsController>(TutorialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
