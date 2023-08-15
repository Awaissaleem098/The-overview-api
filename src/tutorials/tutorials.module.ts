import { Module } from '@nestjs/common';
import { TutorialsController } from './tutorials.controller';
import { TutorialsService } from './tutorials.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tutorial, TutorialSchema } from './tutorial.model';
import { TutorialsRepository } from './tutorials.repository';
import { FeedbackGatewayService } from './tutorials.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tutorial.name, schema: TutorialSchema }])],
  controllers: [TutorialsController],
  providers: [TutorialsService, TutorialsRepository, FeedbackGatewayService],
})
export class TutorialsModule {}
