import { LoginTexts } from './texts';

export const errorFieldNameToStateFieldMap: Record<string, string> = {
  userName: 'loginInputError',
  password: 'passwordInputError',
};

export const errorCodeToTextMap: Record<number, string> = {
  1003: LoginTexts.InvalidUserNameOrPassword,
};
