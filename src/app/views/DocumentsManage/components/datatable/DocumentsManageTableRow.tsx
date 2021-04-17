import * as React from 'react';
import { IDocument } from '../../interfaces/interfaces';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { CreateDocumentFormFields } from '../../../../../../common/constants/createDocumentForm';
import { CloudDownload } from '@material-ui/icons';
import { isMobile } from '../../../../utils/dom';
import { DocumentsManageTableRowActionMenu } from './DocumentsManageTableRowActionMenu';
import { useCallback, useContext } from 'react';
import { AppContext } from '../../../../AppRoot';
import { openDocumentDetailsAction } from '../../../../actions/appActions';

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
}

export function DocumentsManageTableRow(props: IProps): JSX.Element {
  const { dispatch } = useContext(AppContext);
  const classes = useStyles();
  const { document } = props;
  const downloadUrl = `/data/document/${document._id}/files`;
  const handleDetailsClick = useCallback(
    (document: IDocument) => {
      dispatch(openDocumentDetailsAction(document));
    },
    [document],
  );

  return (
    <TableRow>
      <TableCell
        title={document[CreateDocumentFormFields.DocumentName]}
        className={classes.nameCell}
      >
        {document[CreateDocumentFormFields.DocumentName]}
      </TableCell>
      <TableCell className={classes.centerCell}>
        {document[CreateDocumentFormFields.DocumentDate] || EMPTY_CELL_MARK}
      </TableCell>
      {!isMobile() && (
        <TableCell
          title={document[CreateDocumentFormFields.DocumentTags].join(',')}
          className={classes.tagsCell}
        >
          {document[CreateDocumentFormFields.DocumentTags].length
            ? document[CreateDocumentFormFields.DocumentTags]
            : EMPTY_CELL_MARK}
        </TableCell>
      )}
      {!isMobile() && (
        <TableCell className={classes.centerCell}>
          {document[CreateDocumentFormFields.DocumentNetValue] ||
            EMPTY_CELL_MARK}
        </TableCell>
      )}
      {!isMobile() && (
        <TableCell className={classes.centerCell}>
          {document[CreateDocumentFormFields.DocumentGrossValue] ||
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
      {isMobile() && (
        <TableCell>
          <DocumentsManageTableRowActionMenu
            document={document}
            handleDetailsClick={handleDetailsClick}
          />
        </TableCell>
      )}
    </TableRow>
  );
}