import { Module } from '@nestjs/common';
import { ApplicationController } from './controllers/application.controller';
import { DataController } from './controllers/data.controller';
import { TagsService } from './services/tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas/tag.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [ApplicationController, DataController],
  providers: [TagsService],
})
export class ApplicationModule {}
