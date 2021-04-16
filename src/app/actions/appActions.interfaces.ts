import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';
import { IDocument } from '../views/DocumentsManage/interfaces/interfaces';

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

export type AppActionTypes =
  | OpenSnackBarAction
  | CloseSnackBarAction
  | OpenDocumentDetailsModal
  | CloseDocumentDetailsModal
  | OpenImageModal
  | CloseImageModal;
