import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateDocumentBody } from '../controllers/data.controller';
import { IApiError } from '../../common/interfaces/interfaces';
import { TagsService } from '../services/tags.service';
import {
  validateDocumentFilesCreate,
  validateDocumentName,
  validateDocumentTags,
  validateDocumentValues,
} from '../utils/validation';

@Injectable()
export class CreateDocumentValidationPipe implements PipeTransform {
  public constructor(private tagsService: TagsService) {}

  public async transform(
    value: CreateDocumentBody & { userId: string },
    metadata: ArgumentMetadata,
  ): Promise<typeof value> {
    const errors: IApiError[] = [];
    const {
      documentName,
      documentGrossValue,
      documentNetValue,
      documentTags,
      files,
      userId,
    } = value;
    const userTags = (await this.tagsService.findAll(userId)).map(
      (tag) => tag.tagName,
    );

    validateDocumentName(errors, documentName);
    validateDocumentTags(errors, documentTags, userTags);
    validateDocumentValues(errors, documentNetValue, documentGrossValue);
    validateDocumentFilesCreate(errors, files);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
