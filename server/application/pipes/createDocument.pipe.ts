import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateDocumentBody } from '../controllers/data.controller';
import { IApiError } from '../../common/interfaces/interfaces';
import { ErrorCodes } from '../../../common/constants/errors';
import {
  acceptedFileUploadFiles,
  CreateDocumentFormFields,
  DocumentFormConstants,
} from '../../../common/constants/createDocumentForm';
import { TagsService } from '../services/tags.service';

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

    if (!documentName) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentName,
        errorCode: ErrorCodes.DocumentNameEmpty,
        message: "Document name can't be empty",
      });
    }
    if (
      documentName &&
      documentName.length > DocumentFormConstants.DocumentNameMaxLength
    ) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentName,
        errorCode: ErrorCodes.DocumentNameTooLong,
        message: 'Document name too long, max. 32 chars allowed',
      });
    }
    if (
      documentTags &&
      !documentTags.split(',').every((tag) => userTags.includes(tag))
    ) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentTags,
        errorCode: ErrorCodes.InvalidTag,
        message: 'Field contains invalid tags',
      });
    }
    if (typeof documentNetValue !== 'number' && documentNetValue) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentNetValue,
        errorCode: ErrorCodes.NetValueInvalidType,
        message: 'Value must be a number',
      });
    }
    if (typeof documentGrossValue !== 'number' && documentGrossValue) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentGrossValue,
        errorCode: ErrorCodes.GrossValueInvalidType,
        message: 'Value must be a number',
      });
    }
    if (
      typeof documentNetValue === 'number' &&
      typeof documentGrossValue === 'number' &&
      documentNetValue > documentGrossValue
    ) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentNetValue,
        errorCode: ErrorCodes.NetValueGreaterThanNetValue,
        message: 'Invalid values',
      });
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentGrossValue,
        errorCode: ErrorCodes.NetValueGreaterThanNetValue,
        message: 'Invalid values',
      });
    }
    if (!files || files?.length === 0) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentFile,
        errorCode: ErrorCodes.NoFilesUploaded,
        message: 'No file selected',
      });
    } else if (
      !files.every((file) => acceptedFileUploadFiles.includes(file.mimetype))
    ) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentFile,
        errorCode: ErrorCodes.FilesInvalidType,
        message: 'Invalid type of one of files',
      });
    } else if (files.length > 4) {
      errors.push({
        fieldName: CreateDocumentFormFields.DocumentFile,
        errorCode: ErrorCodes.TooManyFilesUploaded,
        message: 'You can upload max 4 files per document',
      });
    }

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
