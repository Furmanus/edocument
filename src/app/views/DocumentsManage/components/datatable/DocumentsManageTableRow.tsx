import * as React from 'react';
import { IDocument } from '../../interfaces/interfaces';
import { IconButton, makeStyles, TableCell, TableRow } from '@material-ui/core';
import { CreateDocumentFormFields } from '../../../../../../common/constants/createDocumentForm';
import { CloudDownload } from '@material-ui/icons';
import { ApplicationApi } from '../../../../api/api';

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
  const classes = useStyles();
  const { document } = props;
  const onDownloadClick = React.useCallback(async () => {
    ApplicationApi.getDocumentFiles(document._id);
  }, [document]);

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
      <TableCell
        title={document[CreateDocumentFormFields.DocumentTags].join(',')}
        className={classes.tagsCell}
      >
        {document[CreateDocumentFormFields.DocumentTags].length
          ? document[CreateDocumentFormFields.DocumentTags]
          : EMPTY_CELL_MARK}
      </TableCell>
      <TableCell className={classes.centerCell}>
        {document[CreateDocumentFormFields.DocumentNetValue] || EMPTY_CELL_MARK}
      </TableCell>
      <TableCell className={classes.centerCell}>
        {document[CreateDocumentFormFields.DocumentGrossValue] ||
          EMPTY_CELL_MARK}
      </TableCell>
      <TableCell className={classes.centerCell}>
        <IconButton
          color="primary"
          aria-label="download"
          onClick={onDownloadClick}
        >
          <CloudDownload />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
