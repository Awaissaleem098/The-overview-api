import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class FeedBack {
  @Prop()
  name: string;

  @Prop()
  message: string;
}

@Schema()
export class Blog {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop()
  date: Date;

  @Prop([FeedBack])
  feedbacks?: FeedBack[];
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
export type BlogDocument = Blog & Document;
