import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback, Tutorial, TutorialDocument, UpdateTutorial } from './tutorial.model';
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

  async update(publicId: string, tutorial: UpdateTutorial): Promise<Tutorial> {
    const updatedResult = await this.tutorialModel.updateOne({ publicId }, tutorial).exec();
    if (updatedResult.modifiedCount > 0) {
      return await this.findByPublicId(publicId);
    }
    throw Error(`The tutorial with id ${publicId} could not be updated with ${tutorial}`);
  }

  async updateFeedbacks(publicId: string, feedbacks: Feedback[]): Promise<Feedback[]> {
    const updatedResult = await this.tutorialModel.updateOne({ publicId }, { $set: { feedbacks: feedbacks } }).exec();
    if (updatedResult.modifiedCount > 0) {
      return feedbacks;
    }
    throw Error(`The tutorial with id ${publicId} could not be updated with new feedback.`);
  }

  async findFeedbacks(publicId: string): Promise<Feedback[] | null> {
    const tutorial = await this.tutorialModel.findOne({ publicId: publicId }).exec();
    return tutorial?.feedbacks;
  }
}
