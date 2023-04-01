import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tutorial, TutorialDocument } from './tutorial.model';
import { Model } from 'mongoose';

@Injectable()
export class TutorialsRepository {
  constructor(@InjectModel(Tutorial.name) private tutorialModel: Model<TutorialDocument>) {}

  async create(tutorial: Tutorial): Promise<Tutorial> {
    const createdTutorial = new this.tutorialModel(tutorial);
    return createdTutorial.save();
  }

  async findByPublicId(publicId: string): Promise<Tutorial> {
    return this.tutorialModel.findOne({ publicId: publicId }).exec();
  }

  async findAll(): Promise<Tutorial[]> {
    return this.tutorialModel.find().exec();
  }
}
