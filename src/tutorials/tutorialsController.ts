import { Body, Controller, Get, Logger, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { TutorialsService } from './tutorials.service';
import { CreateTutorialDto, TutorialPreviewDto } from './tutorial.dto';
import { Tutorial } from './tutorial.model';
import { TutorialNotFound } from './tutorial.error';

@Controller('tutorials')
export class TutorialsController {
  private readonly logger = new Logger(TutorialsController.name);

  constructor(private service: TutorialsService) {}

  @Post()
  private async create(@Body() createTutorialDto: CreateTutorialDto): Promise<Tutorial> {
    return this.service
      .create(createTutorialDto)
      .then((createdTutorial) => createdTutorial)
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

  @Get(':id/content')
  private async getTutorialContentByPublicId(@Param('id', ParseUUIDPipe) publicId: string): Promise<string> {
    return this.service
      .getByPublicId(publicId)
      .then((foundTutorial: Tutorial) => foundTutorial.content)
      .catch((e) => this.handleError(e));
  }

  private toTutorialPreviewDto(tutorial: Tutorial): TutorialPreviewDto {
    return {
      publicId: tutorial.publicId,
      title: tutorial.title,
      logo: tutorial.logo,
      description: tutorial.description,
      duration: tutorial.duration,
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
