import * as React from 'react';
import { IconButton, makeStyles, Modal } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

interface IProps {
  src: string;
  onClose: () => void;
}

const useStyles = makeStyles({
  modal: {
    background: 'white',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    outline: 'none',
    boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'fixed',
    right: 0,
    top: 0,
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
      disableBackdropClick={true}
    >
      <React.Fragment>
        <IconButton className={classes.closeButton} onClick={onClose}>
          <Cancel />
        </IconButton>
        <img className={classes.image} src={src} alt="document" />
      </React.Fragment>
    </Modal>
  );
}
