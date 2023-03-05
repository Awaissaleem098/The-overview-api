import { Test, TestingModule } from '@nestjs/testing';
import { FormationsRepository } from './formations.service';

describe('FormationsRepository', () => {
  let repository: FormationsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormationsRepository],
    }).compile();

    repository = module.get<FormationsRepository>(FormationsRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
});
