import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { AppNavigation } from './components/AppNavigation';
import { Box } from '@material-ui/core';
import { AppLoader } from './components/Loader';
import { AppSnackbar } from '../common/components/AppSnackbar';
import { useCallback, useMemo, useReducer } from 'react';
import { appReducer, initialState } from './reducer/appReducer';
import { closeSnackBarAction } from './actions/appActions';

export const AppContext = React.createContext({ state: null, dispatch: null });

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
          <BrowserRouter basename="/app">
            <Switch>
              <Route exact path="/manage">
                <DocumentsManage />
              </Route>
              <Route exact path="/settings">
                <DocumentSettings />
              </Route>
            </Switch>
          </BrowserRouter>
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
