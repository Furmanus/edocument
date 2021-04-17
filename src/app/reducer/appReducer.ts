import { AppActionTypes } from '../actions/appActions.interfaces';
import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';
import { IDocument } from '../views/DocumentsManage/interfaces/interfaces';
import { BreakpointTypes } from '../constants/constants';

// TODO split reducers between two views
export interface IApplicationState {
  isSnackBarOpen: boolean;
  snackBarText: string;
  snackBarSeverity: SnackBarSeverityType;
  examinedDocument: IDocument;
  viewedImageSrc: string;
  windowWidth: BreakpointTypes;
}

export const initialState: IApplicationState = {
  isSnackBarOpen: false,
  snackBarText: '',
  snackBarSeverity: 'info',
  examinedDocument: null,
  viewedImageSrc: null,
  windowWidth:
    window.innerWidth <= 480 ? BreakpointTypes.Mobile : BreakpointTypes.Desktop,
};

export function appReducer(
  state: IApplicationState,
  action: AppActionTypes,
): IApplicationState {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case AppActions.OpenSnackBar:
      return {
        ...state,
        snackBarText: action.snackBarText,
        snackBarSeverity: action.snackBarSeverity,
        isSnackBarOpen: true,
      };
    case AppActions.CloseSnackBar:
      return {
        ...state,
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'info',
      };
    case AppActions.OpenDetailsModal:
      return {
        ...state,
        examinedDocument: action.document,
      };
    case AppActions.CloseDetailsModal:
      return {
        ...state,
        examinedDocument: null,
      };
    case AppActions.OpenImageModal:
      return {
        ...state,
        viewedImageSrc: action.viewedImageSrc,
      };
    case AppActions.CloseImageModal:
      return {
        ...state,
        viewedImageSrc: null,
      };
    case AppActions.ResizeWindow:
      return {
        ...state,
        windowWidth: action.windowWidth,
      };
  }
}
