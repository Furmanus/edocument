import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ApplicationController } from './controllers/application.controller';
import { DataController } from './controllers/data.controller';
import { TagsService } from './services/tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';
import { MulterModule } from '@nestjs/platform-express';
import { DocumentsService } from './services/documents.service';
import { AwsService } from './services/aws.service';
import { AppDocument, DocumentSchema } from './schemas/document.schema';
import { CompressService } from './services/compress.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Tag.name, schema: TagSchema },
      { name: AppDocument.name, schema: DocumentSchema },
    ]),
    MulterModule.register({
      dest: resolve(__dirname, '..', '..', 'tempUpload'),
    }),
  ],
  controllers: [ApplicationController, DataController],
  providers: [TagsService, DocumentsService, AwsService, CompressService],
})
export class ApplicationModule {}
