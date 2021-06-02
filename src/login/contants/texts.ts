import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../common/constants/loginForm';

export const LoginTexts = {
  // FORM
  UserNameInputPlaceholder: 'User name',
  UserPasswordInputPlaceholder: 'Password',
  UserRepeatPasswordInputPlaceholder: 'Repeat password',
  LoginButtonText: 'login',
  RegisterButtonText: 'register',
  NoAccountText: 'Create new account',
  AlreadyAccountText: 'Already have account? Log in',
  // FORM ERRORS
  UserNameTooShort: `User name too short, at least ${USERNAME_MIN_LENGTH} chars required`,
  UserNameEmpty: 'Empty user name',
  UserPasswordEmpty: 'Empty user password',
  InvalidUserNameOrPassword: 'Invalid user name or password',
  PasswordTooShort: `User password too short, at least ${PASSWORD_MIN_LENGTH} chars required`,
  RepeatPasswordDontMatch: 'Passwords does not match',
};
