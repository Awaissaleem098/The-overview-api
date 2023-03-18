import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Formation {
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
  createdAt: Date;
  @Prop()
  updatedAt: Date;

  constructor(title: string, description: string, content: string, duration: string, logo: string) {
    this.title = title;
    this.description = description;
    this.content = content;
    this.duration = duration;
    this.logo = logo;
  }
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
export type FormationDocument = HydratedDocument<Formation>;
