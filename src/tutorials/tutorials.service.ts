import { Injectable } from '@nestjs/common';
import { TutorialsRepository } from './tutorials.repository';
import { CreateTutorialDto } from './tutorial.dto';
import { Tutorial } from './tutorial.model';
import { TutorialNotFound } from './tutorial.error';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TutorialsService {
  constructor(private repository: TutorialsRepository) {}

  async create(createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    const tutorial = new Tutorial(
      createTutorialDto.title,
      createTutorialDto.previewDescription,
      createTutorialDto.content,
      createTutorialDto.duration,
      createTutorialDto.logo,
    );
    tutorial.publicId = uuidv4();
    tutorial.createdAt = new Date();
    tutorial.updatedAt = new Date();

    return await this.repository.create(tutorial);
  }

  async getByPublicId(publicId: string): Promise<Tutorial | TutorialNotFound> {
    const foundTutorial = await this.repository.findByPublicId(publicId);
    if (!foundTutorial) {
      return new TutorialNotFound(publicId);
    }
    return foundTutorial;
  }

  async getAll(): Promise<Tutorial[]> {
    return await this.repository.findAll();
  }
}
