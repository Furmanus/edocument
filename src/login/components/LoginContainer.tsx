import * as React from 'react';
import { Box } from '@material-ui/core';
import logo from '../../common/assets/logo.png';
import { LoginForm } from './LoginForm';

export function LoginContainer(): React.ReactElement {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      component="main"
      width="100%"
      height="100%"
      paddingTop="32px"
    >
      <img src={logo} alt="logo" />
      <LoginForm />
    </Box>
  );
}
