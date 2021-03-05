import { AppActionTypes } from '../actions/appActions.interfaces';
import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';

export interface IApplicationState {
  isSnackBarOpen: boolean;
  snackBarText: string;
  snackBarSeverity: SnackBarSeverityType;
}

export const initialState: IApplicationState = {
  isSnackBarOpen: false,
  snackBarText: '',
  snackBarSeverity: 'info',
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
  }
}
