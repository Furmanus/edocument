import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';
import { IDocument } from '../views/DocumentsManage/interfaces/interfaces';
import { BreakpointTypes } from '../constants/constants';

interface Action<Type extends AppActions> {
  type: Type;
}

interface OpenSnackBarAction extends Action<AppActions.OpenSnackBar> {
  snackBarText: string;
  snackBarSeverity: SnackBarSeverityType;
}

type CloseSnackBarAction = Action<AppActions.CloseSnackBar>;

interface OpenDocumentDetailsModal extends Action<AppActions.OpenDetailsModal> {
  document: IDocument;
}

type CloseDocumentDetailsModal = Action<AppActions.CloseDetailsModal>;

interface OpenImageModal extends Action<AppActions.OpenImageModal> {
  viewedImageSrc: string;
}

type CloseImageModal = Action<AppActions.CloseImageModal>;

export interface IResizeWindowAction extends Action<AppActions.ResizeWindow> {
  windowWidth: BreakpointTypes;
}

export type AppActionTypes =
  | OpenSnackBarAction
  | CloseSnackBarAction
  | OpenDocumentDetailsModal
  | CloseDocumentDetailsModal
  | OpenImageModal
  | CloseImageModal
  | IResizeWindowAction;
