/* eslint-disable @typescript-eslint/no-use-before-define */
import Modal from '@material-ui/core/Modal';
import * as React from 'react';
import { IDocument } from '../interfaces/interfaces';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  GridList,
  GridListTile,
  IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { DocumentsManageTexts } from '../constants/documentsManageTexts';
import { DocumentsManageDetailsModalPreviewSection } from './detailsModal/DocumentManageDetailsModalPreviewSection';
import { useDocumentsDetailsPreview } from '../hooks/useDocumentsDetailsPreview';
import { formatCurrency } from '../../../utils/currency';
import { CSSProperties } from '@material-ui/styles';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  document: IDocument;
}

const useStyles = makeStyles({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardWrapper: {
    minWidth: 300,
  },
  labelGridCell: {
    maxWidth: 110,
  },
  paper: {
    outline: 'none',
    minWidth: 480,
    '@media (max-width: 480px)': {
      minWidth: 'unset',
      width: '100%',
    },
  },
  infoWrapper: {
    display: 'grid',
    gridTemplateColumns: '110px auto',
    gridTemplateRows: '1fr 1fr 1fr',
    gridGap: '5px 15px',
  },
});

const EMPTY_VALUE = '-';

export function DocumentsManageDetailsModal({
  document,
  onClose,
  isOpen,
}: IProps): JSX.Element {
  const classes = useStyles();
  const [filesImages, isLoadingFiles] = useDocumentsDetailsPreview(
    document?._id,
  );

  if (!document) {
    return null;
  }

  const {
    documentName,
    documentDate,
    documentGrossValue,
    documentNetValue,
    documentTags,
  } = document;

  return (
    <Modal className={classes.modalWrapper} open={isOpen} onClose={onClose}>
      <Fade in={isOpen}>
        <Paper className={classes.paper} elevation={2}>
          <Card className={classes.cardWrapper}>
            <CardHeader
              avatar={<Avatar>D</Avatar>}
              action={
                <IconButton onClick={onClose}>
                  <Cancel />
                </IconButton>
              }
              title={documentName}
              subheader={documentDate}
            />
            <Divider />
            <CardContent>
              <Box className={classes.infoWrapper}>
                <Box
                  className={classes.labelGridCell}
                  style={getGridStyles(1, 1)}
                >
                  <Typography>
                    {DocumentsManageTexts.DocumentDetailsTagsLabel}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    noWrap={true}
                    style={getGridStyles(2, 1)}
                  >
                    {documentTags?.join(', ') || EMPTY_VALUE}
                  </Typography>
                </Box>
                <Box
                  className={classes.labelGridCell}
                  style={getGridStyles(1, 2)}
                >
                  <Typography>
                    {DocumentsManageTexts.DocumentDetailsNetValueLabel}
                  </Typography>
                </Box>
                <Box style={getGridStyles(2, 2)}>
                  <Typography variant="body2" color="textSecondary">
                    {(documentNetValue && formatCurrency(documentNetValue)) ||
                      EMPTY_VALUE}
                  </Typography>
                </Box>
                <Box
                  className={classes.labelGridCell}
                  style={getGridStyles(1, 3)}
                >
                  <Typography>
                    {DocumentsManageTexts.DocumentDetailsGrossValueLabel}
                  </Typography>
                </Box>
                <Box style={getGridStyles(2, 3)}>
                  <Typography variant="body2" color="textSecondary">
                    {(documentGrossValue &&
                      formatCurrency(documentGrossValue)) ||
                      EMPTY_VALUE}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Divider />
            <DocumentsManageDetailsModalPreviewSection
              images={filesImages}
              isLoading={isLoadingFiles}
            />
          </Card>
        </Paper>
      </Fade>
    </Modal>
  );
}

function getGridStyles(column: number, row: number): CSSProperties {
  return {
    gridRow: row,
    gridColumn: column,
  };
}
