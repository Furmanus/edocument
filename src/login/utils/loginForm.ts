import { LoginTexts } from '../contants/texts';
import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../common/constants/loginForm';

export function validateUserName(userName: string): string {
  if (userName.length < USERNAME_MIN_LENGTH) {
    return LoginTexts.UserNameTooShort;
  }

  return null;
}

export function validateUserPassword(password: string): string {
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
