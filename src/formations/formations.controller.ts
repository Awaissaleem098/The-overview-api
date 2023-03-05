import { Body, Controller, Get, Logger, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FormationsService } from './formations.service';
import { CreateFormationDto } from './formation.dto';
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

  @Get(':id')
  private async findByPublicId(@Param('id', ParseUUIDPipe) publicId: string): Promise<Formation> {
    return this.service
      .findByPublicId(publicId)
      .then((foundFormation: Formation) => foundFormation)
      .catch((e) => this.handleError(e));
  }

  @Get()
  private async findAll(): Promise<Formation[]> {
    return this.service
      .findAll()
      .then((foundFormations) => foundFormations)
      .catch((e) => this.handleError(e));
  }

  private handleError(e: Error): never {
    this.logger.debug(e.message);
    if (e instanceof FormationNotFound) {
      throw new NotFoundException(e);
    }
    throw e;
  }
}
