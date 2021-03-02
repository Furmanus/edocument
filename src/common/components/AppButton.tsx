import * as React from 'react';
import {
  Button,
  ButtonProps,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

type OwnProps = {
  isLoading?: boolean;
};

const useStyles = makeStyles({
  loader: {
    maxWidth: 0,
    transition: 'max-width 0.3s ease-in-out, margin 0.3s ease-in-out',
    transitionDelay: '0.3s',
  },
  loaderActive: {
    marginLeft: 10,
    maxWidth: 40,
  },
});

function getLoaderSize(buttonSize: 'small' | 'medium' | 'large'): number {
  switch (buttonSize) {
    case 'small':
      return 20;
    case 'medium':
      return 30;
    case 'large':
      return 40;
  }
}

export function AppButton(props: ButtonProps & OwnProps): JSX.Element {
  const classes = useStyles();
  const { isLoading, children, ...otherProps } = props;
  const loaderClassNames = `${classes.loader} ${
    isLoading ? classes.loaderActive : ''
  }`;

  return (
    <Button {...otherProps}>
      {children}
      <CircularProgress
        className={loaderClassNames}
        size={getLoaderSize(otherProps.size)}
      />
    </Button>
  );
}
