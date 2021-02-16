import * as React from 'react';
import { Box } from '@material-ui/core';
import { AppNavigationMenu } from './AppNavigationMenu';

export function AppNavigation(): JSX.Element {
  return (
    <Box
      bgcolor="primary.main"
      width={1}
      component="nav"
      display="flex"
      flexDirection="row"
      justifyContent="flex-end"
      alignItems="center"
    >
      <AppNavigationMenu />
    </Box>
  );
}
