import { Module } from '@nestjs/common';
import { TutorialsController } from './tutorials.controller';
import { TutorialsService } from './tutorials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutorial, TutorialSchema } from './tutorial.model';
import { TutorialsRepository } from './tutorials.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tutorial.name, schema: TutorialSchema }])],
  controllers: [TutorialsController],
  providers: [TutorialsService, TutorialsRepository],
})
export class TutorialsModule {}
