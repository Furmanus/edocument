import { AppActionTypes } from './appActions.interfaces';
import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';

export function openSnackBarAction(
  text: string,
  severity: SnackBarSeverityType,
): AppActionTypes {
  return {
    type: AppActions.OpenSnackBar,
    snackBarText: text,
    snackBarSeverity: severity,
  };
}

export function closeSnackBarAction(): AppActionTypes {
  return { type: AppActions.CloseSnackBar };
}
