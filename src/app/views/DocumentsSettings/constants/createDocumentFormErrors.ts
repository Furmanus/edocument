import { ErrorCodes } from '../../../../../common/constants/errors';
import { DocumentSettingsTexts } from './documentSettingsTexts';

export const createDocumentErrorCodeToMessageMap = new Proxy(
  {
    [ErrorCodes.DocumentNameEmpty]:
      DocumentSettingsTexts.DocumentErrorNameEmpty,
    [ErrorCodes.DocumentNameTooLong]:
      DocumentSettingsTexts.DocumentErrorNameTooLong,
    [ErrorCodes.InvalidTag]: DocumentSettingsTexts.DocumentErrorInvalidTag,
    [ErrorCodes.NetValueInvalidType]:
      DocumentSettingsTexts.DocumentErrorNetValueInvalidType,
    [ErrorCodes.GrossValueInvalidType]:
      DocumentSettingsTexts.DocumentErrorGrossValueInvalidType,
    [ErrorCodes.NetValueGreaterThanNetValue]:
      DocumentSettingsTexts.DocumentErrorNetValueGreaterThanGrossValue,
    [ErrorCodes.FilesInvalidType]:
      DocumentSettingsTexts.DocumentErrorFileInvalidType,
    [ErrorCodes.TooManyFilesUploaded]:
      DocumentSettingsTexts.DocumentErrorTooManyFiles,
    [ErrorCodes.NoFilesUploaded]: DocumentSettingsTexts.DocumentErrorNoFile,
  },
  {
    get(target: any, property: string): string {
      if (property in target) {
        return target[property];
      }

      return DocumentSettingsTexts.DocumentErrorUnknownError;
    },
  },
);
