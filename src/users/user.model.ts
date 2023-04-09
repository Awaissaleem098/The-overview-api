import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop()
  username: string;
  @Prop()
  email: string;

  @Prop()
  password: string;

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export const userSchema = SchemaFactory.createForClass(User);
export type userDocument = HydratedDocument<User>;
