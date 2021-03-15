import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: string;

  @Prop()
  tagName: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);

export type TagDocument = Tag & Document;
