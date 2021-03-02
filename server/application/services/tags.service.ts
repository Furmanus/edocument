import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from '../schemas/tag.schema';
import { Model } from 'mongoose';
import { CreateTagDto } from '../dto/tags.dto';

@Injectable()
export class TagsService {
  public constructor(
    @InjectModel(Tag.name) private TagModel: Model<TagDocument>,
  ) {}

  public create(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.TagModel(createTagDto);

    return createdTag.save();
  }

  public findAll(userId: string): Promise<Tag[]> {
    return this.TagModel.find({ owner: userId }).exec();
  }

  public async validateTagCreation(
    tagName: string,
    userId: string,
  ): Promise<boolean> {
    const userTags = await this.findAll(userId);

    return userTags.every((tag) => tag.tagName !== tagName);
  }
}
