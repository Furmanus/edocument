import * as React from 'react';
import {
  Box,
  Button,
  Fade,
  makeStyles,
  Modal,
  Paper,
  Typography,
} from '@material-ui/core';
import { DocumentsManageTexts } from '../constants/documentsManageTexts';
import { AppButton } from '../../../../common/components/AppButton';

interface IProps {
  isOpen: boolean;
  isDeleting: boolean;
  handleConfirmClick: () => void;
  handleRejectClick: () => void;
}

const useStyles = makeStyles({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 60px',
    outline: 'none',
  },
  typography: {
    marginBottom: 15,
  },
  cancelButton: {
    marginRight: 10,
  },
});

export function DocumentsManageDeleteConfirmModal({
  isOpen,
  isDeleting,
  handleConfirmClick,
  handleRejectClick,
}: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal
      className={classes.modalWrapper}
      open={isOpen}
      onClose={handleRejectClick}
    >
      <Fade in={isOpen}>
        <Paper className={classes.modalContent} elevation={2}>
          <Typography
            className={classes.typography}
            variant="h6"
            component="h3"
          >
            {DocumentsManageTexts.DocumentDeleteModalHeading}
          </Typography>
          <Typography
            className={classes.typography}
            variant="body2"
            color="textSecondary"
          >
            {DocumentsManageTexts.DocumentDeleteModalContent}
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            width="100%"
          >
            <Button
              size="medium"
              className={classes.cancelButton}
              disabled={isDeleting}
              color="secondary"
              onClick={handleRejectClick}
            >
              {DocumentsManageTexts.DocumentDeleteModalReject}
            </Button>
            <AppButton
              size="medium"
              variant="outlined"
              disabled={isDeleting}
              isLoading={isDeleting}
              color="primary"
              onClick={handleConfirmClick}
            >
              {DocumentsManageTexts.DocumentDeleteModalConfirm}
            </AppButton>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
}
