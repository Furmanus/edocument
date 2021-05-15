import * as React from 'react';
import {
  Box,
  Button,
  IconButton,
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
import { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { DocumentsManageDetailsModal } from './DocumentsManageDetailsModal';
import { AppContext } from '../../../AppRoot';
import {
  closeDocumentDetailsAction,
  closeImageModalAction,
  openSnackBarAction,
} from '../../../actions/appActions';
import { AppLoader } from '../../../components/Loader';
import { DocumentManageImagePreviewModal } from './DocumentManageImagePreviewModal';
import { DocumentsManageDeleteConfirmModal } from './DocumentsManageDeleteConfirmModal';
import { ApplicationApi } from '../../../api/api';
import { DocumentsManageTablePagination } from './datatable/DocumentsManageTablePagination';
import { Search } from '@material-ui/icons';
import { DocumentsManageFiltersModal } from './DocumentsManageFiltersModal';

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
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '@media (max-width: 480px)': {
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 16,
      justifyContent: 'space-between',
    },
  },
});

export function DocumentsManagePage(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  const { examinedDocument } = state;
  const {
    isFetching: isFetchingDocuments,
    documents,
    fetchDocuments,
    currentPage,
    onPageChange,
    onPerPageChange,
    rowsPerPage,
    totalDocuments,
    manageFilters,
    isFiltersModalOpen,
    onFiltersButtonClick,
    onFiltersModalClose,
    onFiltersModalSave,
    userTags,
  } = useDocumentsManage();
  const [deletingDocumentId, setDeletingDocumentId] = useState<string>(null);
  const [isDeletingDocument, setIsDeletingDocument] = useState<boolean>(false);
  const onCreateClick = useCallback(() => {
    history.push('/settings');
  }, [history]);
  const onDetailsClose = useCallback(() => {
    dispatch(closeDocumentDetailsAction());
  }, [closeDocumentDetailsAction, dispatch]);
  const onImageModalClose = useCallback(() => {
    dispatch(closeImageModalAction());
  }, [closeImageModalAction, dispatch]);
  const handleDeleteClick = useCallback(
    (documentId: string) => {
      setDeletingDocumentId(documentId);
    },
    [document],
  );
  const handleConfirmDeleteClick = useCallback(() => {
    setIsDeletingDocument(true);

    ApplicationApi.deleteDocument(deletingDocumentId)
      .then(() => {
        setDeletingDocumentId(null);
        dispatch(
          openSnackBarAction(
            DocumentsManageTexts.DocumentDeleteSuccessSnackbarText,
            'success',
          ),
        );
        fetchDocuments();
      })
      .catch(() => {
        setDeletingDocumentId(null);
        dispatch(
          openSnackBarAction(
            DocumentsManageTexts.DocumentDeleteFailureSnackbarText,
            'error',
          ),
        );
      })
      .finally(() => {
        setIsDeletingDocument(false);
      });
  }, [deletingDocumentId]);
  const handleRejectDeleteClick = useCallback(() => {
    setDeletingDocumentId(null);
  }, []);

  return (
    <Paper className={classes.container} component="section" elevation={3}>
      <Typography className={classes.heading} component="h1" variant="h5">
        {DocumentsManageTexts.DocumentsManageHeading}
      </Typography>
      <Box className={classes.buttonContainer}>
        <IconButton size="small" color="primary" onClick={onFiltersButtonClick}>
          <Search />
        </IconButton>
        <Button
          className={classes.createButton}
          variant="outlined"
          color="primary"
          size="small"
          onClick={onCreateClick}
        >
          <Typography variant="button">
            {DocumentsManageTexts.DocumentsManageAddButtonText}
          </Typography>
        </Button>
      </Box>
      <TableContainer>
        {isFetchingDocuments || documents === null ? (
          <AppLoader />
        ) : (
          <React.Fragment>
            <Table>
              <DocumentsManageTableHeader />
              <TableBody>
                {documents.map((document) => (
                  <DocumentsManageTableRow
                    key={document._id}
                    document={document}
                    handleDeleteClick={handleDeleteClick}
                  />
                ))}
              </TableBody>
            </Table>
            <DocumentsManageTablePagination
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              onChangePage={onPageChange}
              onChangeRowsPerPage={onPerPageChange}
              totalRows={totalDocuments}
            />
          </React.Fragment>
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
      <DocumentsManageDeleteConfirmModal
        isOpen={!!deletingDocumentId}
        handleConfirmClick={handleConfirmDeleteClick}
        handleRejectClick={handleRejectDeleteClick}
        isDeleting={isDeletingDocument}
      />
      <DocumentsManageFiltersModal
        isOpen={isFiltersModalOpen}
        onClose={onFiltersModalClose}
        onSave={onFiltersModalSave}
        currentFilters={manageFilters}
        userTags={userTags}
      />
    </Paper>
  );
}
