import * as React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { AppNavigation } from './components/AppNavigation';
import { Box } from '@material-ui/core';
import { AppLoader } from './components/Loader';
import { AppSnackbar } from '../common/components/AppSnackbar';
import { Dispatch, useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  appReducer,
  IApplicationState,
  initialState,
} from './reducer/appReducer';
import { closeSnackBarAction, windowResizeAction } from './actions/appActions';
import { AppActionTypes } from './actions/appActions.interfaces';
import { history } from './utils/history';

interface IAppContext {
  state: IApplicationState;
  dispatch: Dispatch<AppActionTypes>;
}

export const AppContext = React.createContext<IAppContext>({
  state: null,
  dispatch: null,
});

const [DocumentsManage, DocumentSettings] = [
  () =>
    import(/* webpackChunkName: documents-manage */ './views/DocumentsManage'),
  () =>
    import(
      /* webpackChunkName: document-settings */ './views/DocumentsSettings'
    ),
].map((importFunction) =>
  Loadable({
    loader: importFunction,
    loading: AppLoader,
  }),
);

export function AppRoot(): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { isSnackBarOpen, snackBarSeverity, snackBarText } = state;
  const onSnackBarClose = useCallback(() => {
    dispatch(closeSnackBarAction());
  }, []);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const onWindowResize = useCallback(() => {
    dispatch(windowResizeAction());
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  return (
    <React.Fragment>
      <AppNavigation />
      <Box
        component="main"
        flexGrow={1}
        width={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <AppContext.Provider value={contextValue}>
          <Router history={history}>
            <Switch>
              <Route exact path="/manage" component={DocumentsManage} />
              <Route
                exact
                path="/settings/:documentId?"
                component={DocumentSettings}
              />
            </Switch>
          </Router>
        </AppContext.Provider>
      </Box>
      <AppSnackbar
        open={isSnackBarOpen}
        text={snackBarText}
        severity={snackBarSeverity}
        onClose={onSnackBarClose}
        autoHideDuration={4000}
      />
    </React.Fragment>
  );
}
