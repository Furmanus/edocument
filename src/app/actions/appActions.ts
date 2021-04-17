import { AppActionTypes } from './appActions.interfaces';
import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';
import { IDocument } from '../views/DocumentsManage/interfaces/interfaces';
import { BreakpointTypes } from '../constants/constants';

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

export function openImageModalAction(viewedImageSrc: string): AppActionTypes {
  return { type: AppActions.OpenImageModal, viewedImageSrc };
}

export function closeImageModalAction(): AppActionTypes {
  return { type: AppActions.CloseImageModal };
}

export function windowResizeAction(): AppActionTypes {
  const { innerWidth } = window;
  const breakpoint =
    innerWidth <= 480 ? BreakpointTypes.Mobile : BreakpointTypes.Desktop;

  return {
    type: AppActions.ResizeWindow,
    windowWidth: breakpoint,
  };
}
