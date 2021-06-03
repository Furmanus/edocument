import { LoginTexts } from './texts';

export const errorFieldNameToStateFieldMap: Record<string, string> = {
  userName: 'loginInputError',
  password: 'passwordInputError',
};

export const errorCodeToTextMap: Record<number, string> = {
  1000: LoginTexts.UserAlreadyExists,
  1003: LoginTexts.InvalidUserNameOrPassword,
};
