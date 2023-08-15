import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto, FeedbackDto, TutorialPreviewDto, UpdateTutorialDto } from './tutorial.dto';
import { Feedback, Tutorial } from './tutorial.model';
import { TutorialNotFound } from './tutorial.error';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tutorials')
export class TutorialsController {
  private readonly logger = new Logger(TutorialsController.name);

  constructor(private service: TutorialsService) {}

  @Post()
  @UseGuards(AuthGuard)
  private async create(@Body() createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    return this.service
      .create(createTutorialDto)
      .then((createdTutorial) => createdTutorial)
      .catch((e) => this.handleError(e));
  }

  @Patch()
  @UseGuards(AuthGuard)
  private async update(@Body() updateTutorialDto: UpdateTutorialDto): Promise<Tutorial> {
    return this.service
      .update(updateTutorialDto)
      .then((updatedTutorial) => updatedTutorial)
      .catch((e) => this.handleError(e));
  }

  @Get('previews')
  private async getAllTutorialsPreviews(): Promise<TutorialPreviewDto[]> {
    return this.service
      .getAll()
      .then((foundTutorials) => foundTutorials.map((foundTutorial) => this.toTutorialPreviewDto(foundTutorial)))
      .catch((e) => this.handleError(e));
  }

  @Get(':id')
  private async getTutorialByPublicId(@Param('id', ParseUUIDPipe) publicId: string): Promise<Tutorial> {
    return this.service
      .getByPublicId(publicId)
      .then((foundTutorial: Tutorial) => foundTutorial)
      .catch((e) => this.handleError(e));
  }

  @Get(':id/overview')
  private async getTutorialPreviewByPublicId(
    @Param('id', ParseUUIDPipe) publicId: string,
  ): Promise<TutorialPreviewDto> {
    return this.service
      .getByPublicId(publicId)
      .then((foundTutorial: Tutorial) => this.toTutorialPreviewDto(foundTutorial))
      .catch((e) => this.handleError(e));
  }

  @Patch(':id/feedback')
  private async updateFeedbacks(
    @Param('id', ParseUUIDPipe) publicId: string,
    @Body() feedback: FeedbackDto,
  ): Promise<Feedback[]> {
    return this.service
      .updateFeedbacks(publicId, feedback)
      .then((updatedFeedbacks) => {
        return updatedFeedbacks;
      })
      .catch((e) => this.handleError(e));
  }

  private toTutorialPreviewDto(tutorial: Tutorial): TutorialPreviewDto {
    return {
      publicId: tutorial.publicId,
      title: tutorial.title,
      logo: tutorial.logo,
      description: tutorial.description,
      duration: tutorial.duration,
      authorEmail: tutorial.authorEmail,
    };
  }

  private handleError(e: Error): never {
    console.log(e);
    this.logger.debug(e.message);
    if (e instanceof TutorialNotFound) {
      throw new NotFoundException(e);
    }
    throw e;
  }
}
