import { Body, Controller, Get, Logger, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto, FormationPreviewDto } from './formation.dto';
import { Formation } from './formation.model';
import { FormationNotFound } from './formation.error';

@Controller('formations')
export class FormationsController {
  private readonly logger = new Logger(FormationsController.name);

  constructor(private service: FormationsService) {}

  @Post()
  private async create(@Body() createFormationDto: CreateFormationDto): Promise<Formation> {
    return this.service
      .create(createFormationDto)
      .then((createdFormation) => createdFormation)
      .catch((e) => this.handleError(e));
  }

  @Get('previews')
  private async getAllFormationsPreviews(): Promise<FormationPreviewDto[]> {
    return this.service
      .getAll()
      .then((foundFormations) => foundFormations.map((foundFormation) => this.toFormationPreviewDto(foundFormation)))
      .catch((e) => this.handleError(e));
  }

  @Get(':id')
  private async getFormationByPublicId(@Param('id', ParseUUIDPipe) publicId: string): Promise<Formation> {
    return this.service
      .getByPublicId(publicId)
      .then((foundFormation: Formation) => foundFormation)
      .catch((e) => this.handleError(e));
  }

  @Get(':id/overview')
  private async getFormationPreviewByPublicId(
    @Param('id', ParseUUIDPipe) publicId: string,
  ): Promise<FormationPreviewDto> {
    return this.service
      .getByPublicId(publicId)
      .then((foundFormation: Formation) => this.toFormationPreviewDto(foundFormation))
      .catch((e) => this.handleError(e));
  }

  @Get(':id/content')
  private async getFormationContentByPublicId(@Param('id', ParseUUIDPipe) publicId: string): Promise<string> {
    return this.service
      .getByPublicId(publicId)
      .then((foundFormation: Formation) => foundFormation.content)
      .catch((e) => this.handleError(e));
  }

  private toFormationPreviewDto(formation: Formation): FormationPreviewDto {
    return {
      publicId: formation.publicId,
      title: formation.title,
      logo: formation.logo,
      description: formation.description,
      duration: formation.duration,
    };
  }

  private handleError(e: Error): never {
    console.log(e);
    this.logger.debug(e.message);
    if (e instanceof FormationNotFound) {
      throw new NotFoundException(e);
    }
    throw e;
  }
}
