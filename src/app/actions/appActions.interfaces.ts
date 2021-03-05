import { AppActions } from '../constants/appActions';
import { SnackBarSeverityType } from '../../common/interfaces/interfaces';

interface Action<Type extends AppActions> {
  type: Type;
}

interface OpenSnackBarAction extends Action<AppActions.OpenSnackBar> {
  snackBarText: string;
  snackBarSeverity: SnackBarSeverityType;
}

type CloseSnackBarAction = Action<AppActions.CloseSnackBar>;

export type AppActionTypes = OpenSnackBarAction | CloseSnackBarAction;
