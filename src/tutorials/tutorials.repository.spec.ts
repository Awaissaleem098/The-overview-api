import {Test, TestingModule} from '@nestjs/testing';
import {TutorialsRepository} from "./tutorials.repository";

describe('TutorialsRepository', () => {
    let repository: TutorialsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TutorialsRepository],
        }).compile();

        repository = module.get<TutorialsRepository>(TutorialsRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });
});
