import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/tags.dto';
import { TagsService } from '../services/tags.service';
import { CreateTagFormFields } from '../../../common/constants/createTagForm';
import { ErrorCodes } from '../../../common/constants/errors';

@Injectable()
export class CreateTagValidationPipe implements PipeTransform {
  public constructor(private tagsService: TagsService) {}

  public async transform(
    value: CreateTagDto & { userId: string },
    metadata: ArgumentMetadata,
  ): Promise<typeof value> {
    const { tagName, userId } = value;
    const userTags = await this.tagsService.findAll(userId);

    if (userTags.some((tag) => tag.tagName === tagName)) {
      throw new BadRequestException([
        {
          errorCode: ErrorCodes.TagAlreadyExists,
          message: 'Tag already exists',
          fieldName: CreateTagFormFields.TagName,
        },
      ]);
    }

    if (tagName.length < 3) {
      throw new BadRequestException([
        {
          errorCode: ErrorCodes.TagNameTooShort,
          message: 'Tag name too short',
          fieldName: CreateTagFormFields.TagName,
        },
      ]);
    }

    return value;
  }
}
