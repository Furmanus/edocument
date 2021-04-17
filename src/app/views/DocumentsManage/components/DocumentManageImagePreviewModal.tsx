import * as React from 'react';
import {
  Box,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  Zoom,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

interface IProps {
  src: string;
  onClose: () => void;
}

const useStyles = makeStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    outline: 'none',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    padding: 4,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  modalContent: {
    width: '100%',
    height: '100%',
    outline: 'none',
    overflow: 'auto',
    display: 'grid',
    placeItems: 'center',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: 640,
    maxHeight: 480,
    outline: 'none',
  },
});
const backdropProps = {
  invisible: true,
};

export function DocumentManageImagePreviewModal({
  src,
  onClose,
}: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modal}
      open={Boolean(src)}
      onClose={onClose}
      BackdropProps={backdropProps}
    >
      <Zoom in={Boolean(src)}>
        <Paper className={classes.wrapper} elevation={3}>
          <IconButton className={classes.closeButton} onClick={onClose}>
            <Cancel />
          </IconButton>
          <Box className={classes.modalContent}>
            <img className={classes.image} src={src} alt="document" />
          </Box>
        </Paper>
      </Zoom>
    </Modal>
  );
}
