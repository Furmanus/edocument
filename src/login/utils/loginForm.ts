import { LoginTexts } from '../contants/texts';
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../common/constants/loginForm';

type ValidationConfig = {
  mode?: 'login' | 'register';
};

export function validateUserName(
  userName: string,
  { mode }: ValidationConfig = {},
): string {
  if (mode === 'login') {
    if (!userName) {
      return LoginTexts.UserNameEmpty;
    }

    return null;
  }
  if (userName.length < USERNAME_MIN_LENGTH) {
    return LoginTexts.UserNameTooShort;
  }

  return null;
}

export function validateUserPassword(
  password: string,
  { mode }: ValidationConfig = {},
): string {
  if (mode === 'login') {
    if (!password) {
      return LoginTexts.UserPasswordEmpty;
    }

    return null;
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return LoginTexts.PasswordTooShort;
  }

  return null;
}

export function validateRepeatPassword(
  password: string,
  repeated: string,
): string {
  if (password !== repeated) {
    return LoginTexts.RepeatPasswordDontMatch;
  }

  return null;
}
