import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { EditDocumentBody } from '../controllers/data.controller';
import { IApiError } from '../../common/interfaces/interfaces';
import { TagsService } from '../services/tags.service';
import {
  validateDocumentFilesEdit,
  validateDocumentName,
  validateDocumentTags,
  validateDocumentValues,
} from '../utils/validation';

@Injectable()
export class EditDocumentValidationPipe implements PipeTransform {
  public constructor(private tagsService: TagsService) {}

  public async transform(
    value: EditDocumentBody & { userId: string },
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
    validateDocumentFilesEdit(errors, files);

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
