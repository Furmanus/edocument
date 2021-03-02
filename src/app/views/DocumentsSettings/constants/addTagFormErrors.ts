import { ErrorCodes } from '../../../../../common/constants/errors';
import { DocumentSettingsTexts } from './documentSettingsTexts';

export const addTagErrorCodeToMessageMap = new Proxy(
  {
    [ErrorCodes.TagAlreadyExists]: DocumentSettingsTexts.TagAlreadyExistError,
    [ErrorCodes.TagNameTooShort]: DocumentSettingsTexts.TagNameTooShortError,
  },
  {
    get(target: any, property: ErrorCodes): DocumentSettingsTexts {
      if (property in target) {
        return target[property];
      }

      return DocumentSettingsTexts.AddTagSubmitUnknownError;
    },
  },
);
