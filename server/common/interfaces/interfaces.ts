import { Session } from 'express-session';

export interface IApplicationSession extends Session {
  userName: string;
  userId: string;
}
