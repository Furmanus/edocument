import * as React from 'react';
import {
  Button,
  CircularProgress,
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
import { AppButton } from '../../../../common/components/AppButton';
import { useCallback } from 'react';
import { useHistory } from 'react-router';

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
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  heading: {
    textAlign: 'center',
    margin: '15px 0',
    textTransform: 'uppercase',
  },
  createButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});

export function DocumentsManagePage(): JSX.Element {
  const classes = useStyles();
  const history = useHistory();
  const [documents, isFetchingDocuments] = useDocumentsManage();
  const onCreateClick = useCallback(() => {
    history.push('/settings');
  }, [history]);

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
        {DocumentsManageTexts.DocumentsManageAddButtonText}
      </Button>
      <TableContainer>
        {isFetchingDocuments || documents === null ? (
          <CircularProgress className={classes.loader} />
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
    </Paper>
  );
}
