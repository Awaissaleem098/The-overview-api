import { Module } from '@nestjs/common';
import { FormationsController } from './formations.controller';
import { FormationsService } from './formations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Formation, FormationSchema } from './formation.model';
import { FormationsRepository } from './formations.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Formation.name, schema: FormationSchema }])],
  controllers: [FormationsController],
  providers: [FormationsService, FormationsRepository],
})
export class FormationsModule {}
