import * as React from 'react';
import { makeStyles, TableCell, TableHead, TableRow } from '@material-ui/core';
import { DocumentsManageTexts as Texts } from '../../constants/documentsManageTexts';
import { isMobile } from '../../../../utils/dom';

const useStyles = makeStyles({
  headerCell: {
    fontWeight: 600,
    textAlign: 'center',
  },
});

export function DocumentsManageTableHeader(): JSX.Element {
  const classes = useStyles();

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerCell}>
          {Texts.DataTableNameColumnHeader}
        </TableCell>
        <TableCell className={classes.headerCell}>
          {Texts.DataTableDateColumnHeader}
        </TableCell>
        {!isMobile() && (
          <TableCell className={classes.headerCell}>
            {Texts.DataTableTagsColumnHeader}
          </TableCell>
        )}
        {!isMobile() && (
          <TableCell className={classes.headerCell}>
            {Texts.DataTableNetValueColumnHeader}
          </TableCell>
        )}
        {!isMobile() && (
          <TableCell className={classes.headerCell}>
            {Texts.DataTableGrossValueColumnHeader}
          </TableCell>
        )}
        <TableCell className={classes.headerCell}>
          {Texts.DataTableFilesColumnHeader}
        </TableCell>
        {isMobile() && (
          <TableCell className={classes.headerCell}>
            {Texts.DataTableMobileDetailsColumnHeader}
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
