import { Session } from 'express-session';

export interface IApplicationSession extends Session {
  userName: string;
  userId: string;
}

export interface IApiError {
  errorCode: number;
  message?: string;
  fieldName: string;
}

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
