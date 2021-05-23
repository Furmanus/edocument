import { ErrorCodes } from '../../../../../common/constants/errors';
import { DocumentSettingsTexts } from './documentSettingsTexts';

export const addTagErrorCodeToMessageMap: Record<number, string> = new Proxy(
  {
    [ErrorCodes.TagAlreadyExists]: DocumentSettingsTexts.TagAlreadyExistError,
    [ErrorCodes.TagNameTooShort]: DocumentSettingsTexts.TagNameTooShortError,
  },
  {
    get(
      target: Record<number, string>,
      property: string,
    ): DocumentSettingsTexts {
      if (property in target) {
        return target[(property as unknown) as number] as DocumentSettingsTexts;
      }

      return DocumentSettingsTexts.AddTagSubmitUnknownError;
    },
  },
);
