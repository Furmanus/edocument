import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type DocumentType = AppDocument & Document;

@Schema()
export class AppDocument {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: string;

  @Prop()
  documentName: string;

  @Prop()
  documentDate: string;

  @Prop()
  documentTags: string;

  @Prop()
  documentNetValue: number;

  @Prop()
  documentGrossValue: number;

  @Prop()
  documentFiles: string[];
}

export const DocumentSchema = SchemaFactory.createForClass(AppDocument);
