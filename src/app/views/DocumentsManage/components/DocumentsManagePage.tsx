import * as React from 'react';
import {
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

const useStyles = makeStyles({
  container: {
    margin: '30px 60px',
    position: 'relative',
    minWidth: 680,
    minHeight: 480,
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
});

export function DocumentsManagePage(): JSX.Element {
  const classes = useStyles();
  const [documents, isFetchingDocuments] = useDocumentsManage();

  return (
    <Paper className={classes.container} component="section" elevation={3}>
      <Typography className={classes.heading} component="h1" variant="h5">
        {DocumentsManageTexts.DocumentsManageHeading}
      </Typography>
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
