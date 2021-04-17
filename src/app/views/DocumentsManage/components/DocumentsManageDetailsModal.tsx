import Modal from '@material-ui/core/Modal';
import * as React from 'react';
import { IDocument } from '../interfaces/interfaces';
import {
  Avatar,
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
import { CreateDocumentFormFields } from '../../../../../common/constants/createDocumentForm';
import { DocumentsManageTexts } from '../constants/documentsManageTexts';
import { DocumentsManageDetailsModalPreviewSection } from './detailsModal/DocumentManageDetailsModalPreviewSection';
import { useDocumentsDetailsPreview } from '../hooks/useDocumentsDetailsPreview';

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
              title={document[CreateDocumentFormFields.DocumentName]}
              subheader={document[CreateDocumentFormFields.DocumentDate]}
            />
            <Divider />
            <CardContent>
              <GridList cellHeight="auto" cols={2}>
                <GridListTile className={classes.labelGridCell}>
                  <Typography>
                    {DocumentsManageTexts.DocumentDetailsTagsLabel}
                  </Typography>
                </GridListTile>
                <GridListTile>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    noWrap={true}
                  >
                    {document[CreateDocumentFormFields.DocumentTags].join(
                      ', ',
                    ) || EMPTY_VALUE}
                  </Typography>
                </GridListTile>
                <GridListTile className={classes.labelGridCell}>
                  <Typography>
                    {DocumentsManageTexts.DocumentDetailsNetValueLabel}
                  </Typography>
                </GridListTile>
                <GridListTile>
                  <Typography variant="body2" color="textSecondary">
                    {document[CreateDocumentFormFields.DocumentNetValue] ||
                      EMPTY_VALUE}
                  </Typography>
                </GridListTile>
                <GridListTile className={classes.labelGridCell}>
                  <Typography>
                    {DocumentsManageTexts.DocumentDetailsGrossValueLabel}
                  </Typography>
                </GridListTile>
                <GridListTile>
                  <Typography variant="body2" color="textSecondary">
                    {document[CreateDocumentFormFields.DocumentGrossValue] ||
                      EMPTY_VALUE}
                  </Typography>
                </GridListTile>
              </GridList>
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
