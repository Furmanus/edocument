import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Loadable from 'react-loadable';
import { AppNavigation } from './components/AppNavigation';
import { Box } from '@material-ui/core';
import { AppLoader } from './components/Loader';

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
      </Box>
    </React.Fragment>
  );
}
