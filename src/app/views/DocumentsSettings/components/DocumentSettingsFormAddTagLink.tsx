import * as React from 'react';
import { Box, Button, makeStyles } from '@material-ui/core';
import { DocumentSettingsTexts } from '../constants/documentSettingsTexts';

const useStyles = makeStyles({
  button: {
    padding: '6px 0 0',
    marginLeft: 'auto',
    display: 'block',
  },
});

interface IProps {
  onClick: () => void;
}

export function DocumentSettingsFormAddTagLink(props: IProps): JSX.Element {
  const { onClick } = props;
  const classes = useStyles();

  return (
    <Box width="100%">
      <Button
        className={classes.button}
        color="primary"
        size="small"
        onClick={onClick}
      >
        {DocumentSettingsTexts.AddTagButton}
      </Button>
    </Box>
  );
}
