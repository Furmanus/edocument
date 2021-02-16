import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppNavigation } from './AppNavigation';
import { Box } from '@material-ui/core';

export function AppRoot(): JSX.Element {
  return (
    <React.Fragment>
      <AppNavigation />
      <Box component="main" flexGrow={1}>
        HALO
      </Box>
    </React.Fragment>
  );
}
