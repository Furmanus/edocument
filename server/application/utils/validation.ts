import { IApiError, IFile } from '../../common/interfaces/interfaces';
import {
  acceptedFileUploadFiles,
  CreateDocumentFormFields,
  DocumentFormConstants,
} from '../../../common/constants/createDocumentForm';
import { ErrorCodes } from '../../../common/constants/errors';

export function validateDocumentName(
  errors: IApiError[],
  documentName: string,
): IApiError[] {
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

  return errors;
}

export function validateDocumentTags(
  errors: IApiError[],
  documentTags: string,
  userTags: string[],
): IApiError[] {
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

  return errors;
}

export function validateDocumentValues(
  errors: IApiError[],
  documentNetValue: number,
  documentGrossValue: number,
): IApiError[] {
  if (Number(documentNetValue) > Number(documentGrossValue)) {
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

  return errors;
}

export function validateDocumentFilesCreate(
  errors: IApiError[],
  files: IFile[],
): IApiError[] {
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

  return errors;
}

export function validateDocumentFilesEdit(
  errors: IApiError[],
  files: IFile[],
): IApiError[] {
  if (!files.every((file) => acceptedFileUploadFiles.includes(file.mimetype))) {
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

  return errors;
}
