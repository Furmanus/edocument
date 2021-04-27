import * as React from 'react';
import { useCallback, useContext } from 'react';
import { IDocument } from '../../interfaces/interfaces';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { CreateDocumentFormFields } from '../../../../../../common/constants/createDocumentForm';
import { CloudDownload } from '@material-ui/icons';
import { DocumentsManageTableRowActionMenu } from './DocumentsManageTableRowActionMenu';
import { AppContext } from '../../../../AppRoot';
import { openDocumentDetailsAction } from '../../../../actions/appActions';
import { BreakpointTypes } from '../../../../constants/constants';
import { formatCurrency } from '../../../../utils/currency';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  centerCell: {
    textAlign: 'center',
  },
  nameCell: {
    width: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tagsCell: {
    textAlign: 'center',
    maxWidth: 140,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

const EMPTY_CELL_MARK = '-';

interface IProps {
  document: IDocument;
  handleDeleteClick: (documentId: string) => void;
}

export function DocumentsManageTableRow(props: IProps): JSX.Element {
  const { state, dispatch } = useContext(AppContext);
  const history = useHistory();
  const classes = useStyles();
  const { document, handleDeleteClick } = props;
  const downloadUrl = `/data/document/${document._id}/files`;
  const isMobile = state.windowWidth === BreakpointTypes.Mobile;
  const handleDetailsClick = useCallback(
    (document: IDocument) => {
      dispatch(openDocumentDetailsAction(document));
    },
    [document],
  );
  const handleEditClick = useCallback(
    (document: IDocument) => {
      history.push(`/settings/${document._id}`);
    },
    [document],
  );
  const {
    documentGrossValue,
    documentNetValue,
    documentName,
    documentDate,
    documentTags,
  } = document;

  return (
    <TableRow>
      <TableCell
        title={document[CreateDocumentFormFields.DocumentName]}
        className={classes.nameCell}
      >
        {documentName}
      </TableCell>
      <TableCell className={classes.centerCell}>
        {documentDate || EMPTY_CELL_MARK}
      </TableCell>
      {!isMobile && (
        <TableCell
          title={document[CreateDocumentFormFields.DocumentTags]}
          className={classes.tagsCell}
        >
          {documentTags || EMPTY_CELL_MARK}
        </TableCell>
      )}
      {!isMobile && (
        <TableCell className={classes.centerCell}>
          {(documentNetValue && formatCurrency(documentNetValue)) ||
            EMPTY_CELL_MARK}
        </TableCell>
      )}
      {!isMobile && (
        <TableCell className={classes.centerCell}>
          {(documentGrossValue && formatCurrency(documentGrossValue)) ||
            EMPTY_CELL_MARK}
        </TableCell>
      )}
      <TableCell className={classes.centerCell}>
        <IconButton color="primary" aria-label="download">
          <a
            href={downloadUrl}
            download={`${document[CreateDocumentFormFields.DocumentName]}.zip`}
          >
            <CloudDownload />
          </a>
        </IconButton>
      </TableCell>
      <TableCell>
        <DocumentsManageTableRowActionMenu
          document={document}
          handleDetailsClick={handleDetailsClick}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      </TableCell>
    </TableRow>
  );
}
