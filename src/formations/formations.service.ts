import { Injectable } from '@nestjs/common';
import { FormationsRepository } from './formations.repository';
import { CreateFormationDto } from './formation.dto';
import { Formation } from './formation.model';
import { FormationNotFound } from './formation.error';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FormationsService {
  constructor(private repository: FormationsRepository) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const formation = new Formation(
      createFormationDto.title,
      createFormationDto.description,
      createFormationDto.content,
      createFormationDto.duration,
      createFormationDto.logo,
    );
    formation.publicId = uuidv4();
    formation.createdAt = new Date();
    formation.updatedAt = new Date();

    return await this.repository.create(formation);
  }

  async getByPublicId(publicId: string): Promise<Formation | FormationNotFound> {
    const foundFormation = await this.repository.findByPublicId(publicId);
    if (!foundFormation) {
      return new FormationNotFound(publicId);
    }
    return foundFormation;
  }

  async getAll(): Promise<Formation[]> {
    return await this.repository.findAll();
  }
}
