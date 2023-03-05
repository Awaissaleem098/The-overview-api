import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Formation, FormationDocument } from './formation.model';
import { Model } from 'mongoose';

@Injectable()
export class FormationsRepository {
  constructor(@InjectModel(Formation.name) private formationModel: Model<FormationDocument>) {}

  async create(formation: Formation): Promise<Formation> {
    const createdFormation = new this.formationModel(formation);
    return createdFormation.save();
  }

  async findByPublicId(publicId: string): Promise<Formation> {
    return this.formationModel.findOne({ publicId: publicId }).exec();
  }

  async findAll(): Promise<Formation[]> {
    return this.formationModel.find().exec();
  }
}
