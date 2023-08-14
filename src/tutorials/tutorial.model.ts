import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Feedback {
  username: string;
  message: string;
  createdAt: Date;

  constructor(username: string, message: string, createdAt: Date) {
    this.username = username;
    this.message = message;
    this.createdAt = createdAt;
  }
}

@Schema()
export class Tutorial {
  @Prop()
  publicId: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  content: string;
  @Prop()
  duration: string;
  @Prop()
  logo: string;
  @Prop()
  authorEmail: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  feedbacks?: Feedback[];

  constructor(
    title: string,
    description: string,
    content: string,
    duration: string,
    logo: string,
    authorEmail: string,
  ) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.duration = duration;
    this.logo = logo;
    this.authorEmail = authorEmail;
  }
}

export const TutorialSchema = SchemaFactory.createForClass(Tutorial);
export type TutorialDocument = HydratedDocument<Tutorial>;

export class UpdateTutorial {
  title?: string;

  description?: string;

  content?: string;

  duration?: string;
  logo?: string;

  updatedAt?: Date;

  constructor(title: string, description: string, content: string, duration: string, logo: string, updatedAt: Date) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.duration = duration;
    this.logo = logo;
    this.updatedAt = updatedAt;
  }
}
