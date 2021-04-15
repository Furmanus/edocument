import * as React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loader: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'none',
  },
});

export function AppLoader(): JSX.Element {
  const classes = useStyles();

  return <CircularProgress className={classes.loader} />;
}
