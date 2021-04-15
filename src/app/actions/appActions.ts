import { AppActionTypes } from './appActions.interfaces';
import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';
import { IDocument } from '../views/DocumentsManage/interfaces/interfaces';

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

export function openDocumentDetailsAction(document: IDocument): AppActionTypes {
  return { type: AppActions.OpenDetailsModal, document };
}

export function closeDocumentDetailsAction(): AppActionTypes {
  return { type: AppActions.CloseDetailsModal };
}
