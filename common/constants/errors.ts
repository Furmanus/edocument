export const enum ErrorCodes {
  // LOGIN
  RegisterUserAlreadyExists = 1000,
  UserNameTooShort = 1001,
  PasswordTooShort = 1002,
  InvalidUserOrPassword = 1003,
  // TAG CREATION
  TagAlreadyExists = 1004,
  TagNameTooShort = 1005,
  // DOCUMENT CREATION
  DocumentNameEmpty = 2000,
  DocumentNameTooLong = 2001,
  InvalidTag = 2002,
  NetValueInvalidType = 2003,
  GrossValueInvalidType = 2004,
  NetValueGreaterThanNetValue = 2005,
  TooManyFilesUploaded = 2006,
  FilesInvalidType = 2007,
  NoFilesUploaded = 2008,
}
