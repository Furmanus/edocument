import { IApiError } from '../../../../common/interfaces/interfaces';
import { User } from '../schemas/user.schema';

export function isApiErrorArray(obj: object): obj is IApiError[] {
  if (Array.isArray(obj) && obj.length === 0) {
    return true;
  } else if (Array.isArray(obj) && obj.length > 0) {
    return 'errorCode' in obj[0];
  }

  return false;
}

export function isUser(obj: object): obj is User {
  return 'userName' in obj && '_id' in obj;
}
