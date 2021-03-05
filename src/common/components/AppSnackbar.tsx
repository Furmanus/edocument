import * as React from 'react';
import { Snackbar, SnackbarProps } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { SnackBarSeverityType } from '../interfaces/interfaces';

type ComponentProps = Pick<
  SnackbarProps,
  'open' | 'autoHideDuration' | 'onClose'
> & { text: string; severity: SnackBarSeverityType };

export function AppSnackbar(props: ComponentProps): JSX.Element {
  const { text, autoHideDuration, onClose, open, severity } = props;

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert severity={severity}>{text}</Alert>
    </Snackbar>
  );
}
