import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  tel: string;

  @Prop()
  password: string;

  @Prop({ default: true })
  used: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
