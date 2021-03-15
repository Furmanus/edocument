import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';
import {
  Box,
  makeStyles,
  TextField,
  TextFieldProps,
  Typography,
} from '@material-ui/core';

type ComponentProps = {
  fieldProps: FieldRenderProps<string, HTMLInputElement>;
  additionalClasses?: string;
  wrapperProps?: Omit<React.CSSProperties, 'translate'>;
} & TextFieldProps;

const useStyles = makeStyles({
  formField: {
    marginBottom: 2,
  },
  helperText: {
    fontSize: 10,
    minHeight: 16,
    marginBottom: 16,
    transition: 'color 0.3s ease-in-out',
  },
});

export function TextFieldWithHint(props: ComponentProps): JSX.Element {
  const {
    fieldProps,
    additionalClasses,
    wrapperProps = {},
    helperText,
    ...otherProps
  } = props;
  const { input, meta } = fieldProps;
  const { error, submitError, touched, modifiedSinceLastSubmit } = meta;
  const classes = useStyles();
  const errorToDisplay =
    touched && !modifiedSinceLastSubmit && (error || submitError);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      {...wrapperProps}
    >
      <TextField
        className={`${classes.formField} ${additionalClasses}`}
        error={Boolean(errorToDisplay)}
        {...otherProps}
        {...input}
      />
      <Typography
        className={classes.helperText}
        color={errorToDisplay ? 'error' : 'textPrimary'}
      >
        {errorToDisplay || helperText}
      </Typography>
    </Box>
  );
}
