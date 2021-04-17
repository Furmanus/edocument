import * as React from 'react';
import {
  Button,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from '@material-ui/core';
import { useDocumentsManage } from '../hooks/useDocumentsManage';
import { DocumentsManageTableHeader } from './datatable/DocumentsManageTableHeader';
import { DocumentsManageTexts } from '../constants/documentsManageTexts';
import { DocumentsManageTableRow } from './datatable/DocumentsManageTableRow';
import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router';
import { DocumentsManageDetailsModal } from './DocumentsManageDetailsModal';
import { AppContext } from '../../../AppRoot';
import {
  closeDocumentDetailsAction,
  closeImageModalAction,
} from '../../../actions/appActions';
import { AppLoader } from '../../../components/Loader';
import { DocumentManageImagePreviewModal } from './DocumentManageImagePreviewModal';

const useStyles = makeStyles({
  container: {
    margin: '30px 60px',
    position: 'relative',
    minWidth: 680,
    minHeight: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      minWidth: 'unset',
      height: '100%',
      width: '100%',
      padding: '0 5px',
      margin: 0,
    },
  },
  heading: {
    textAlign: 'center',
    margin: '15px 0',
    textTransform: 'uppercase',
  },
  createButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    '@media (max-width: 480px)': {
      marginTop: 15,
      marginBottom: 15,
    },
  },
});

export function DocumentsManagePage(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const { examinedDocument } = state;
  const [documents, isFetchingDocuments] = useDocumentsManage();
  const onCreateClick = useCallback(() => {
    history.push('/settings');
  }, [history]);
  const onDetailsClose = useCallback(() => {
    dispatch(closeDocumentDetailsAction());
  }, [closeDocumentDetailsAction, dispatch]);
  const onImageModalClose = useCallback(() => {
    dispatch(closeImageModalAction());
  }, [closeImageModalAction, dispatch]);

  return (
    <Paper className={classes.container} component="section" elevation={3}>
      <Typography className={classes.heading} component="h1" variant="h5">
        {DocumentsManageTexts.DocumentsManageHeading}
      </Typography>
      <Button
        className={classes.createButton}
        variant="contained"
        color="primary"
        size="small"
        onClick={onCreateClick}
      >
        <Typography variant="button">
          {DocumentsManageTexts.DocumentsManageAddButtonText}
        </Typography>
      </Button>
      <TableContainer>
        {isFetchingDocuments || documents === null ? (
          <AppLoader />
        ) : (
          <Table>
            <DocumentsManageTableHeader />
            <TableBody>
              {documents.map((document) => (
                <DocumentsManageTableRow
                  key={document._id}
                  document={document}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <DocumentsManageDetailsModal
        isOpen={Boolean(examinedDocument)}
        onClose={onDetailsClose}
        document={examinedDocument}
      />
      <DocumentManageImagePreviewModal
        src={state.viewedImageSrc}
        onClose={onImageModalClose}
      />
    </Paper>
  );
}