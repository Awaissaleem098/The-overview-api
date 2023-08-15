import { Injectable } from '@nestjs/common';
import { TutorialsRepository } from './tutorials.repository';
import { CreateTutorialDto, FeedbackDto, UpdateTutorialDto } from './tutorial.dto';
import { Feedback, Tutorial, UpdateTutorial } from './tutorial.model';
import { TutorialNotFound } from './tutorial.error';
import { v4 as uuidv4 } from 'uuid';
import { FeedbackGatewayService } from './tutorials.gateway';

@Injectable()
export class TutorialsService {
  constructor(private repository: TutorialsRepository, private feedbackGatewayService: FeedbackGatewayService) {}

  async create(createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    const tutorial = new Tutorial(
      createTutorialDto.title,
      createTutorialDto.description,
      createTutorialDto.content,
      createTutorialDto.duration,
      createTutorialDto.logo,
      createTutorialDto.authorEmail,
    );
    tutorial.publicId = uuidv4();
    tutorial.createdAt = new Date();
    tutorial.updatedAt = new Date();

    return await this.repository.create(tutorial);
  }

  async update(updateTutorialDto: UpdateTutorialDto): Promise<Tutorial> {
    const updateTutorial: UpdateTutorial = new UpdateTutorial(
      updateTutorialDto.title,
      updateTutorialDto.description,
      updateTutorialDto.content,
      updateTutorialDto.duration,
      updateTutorialDto.logo,
      new Date(),
    );
    return await this.repository.update(updateTutorialDto.publicId, updateTutorial);
  }

  async updateFeedbacks(publicId: string, feedbackDto: FeedbackDto): Promise<Feedback[]> {
    const feedback: Feedback = new Feedback(feedbackDto.username, feedbackDto.message, new Date());
    let feedbacks = await this.repository.findFeedbacks(publicId);
    if (!feedbacks) {
      feedbacks = [];
    }
    feedbacks.push(feedback);

    const updatedFeedbacks = await this.repository.updateFeedbacks(publicId, feedbacks);
    await this.feedbackGatewayService.broadcastNewFeedback(feedback);

    return updatedFeedbacks;
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
