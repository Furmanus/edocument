import { makeStyles, TablePagination } from '@material-ui/core';
import * as React from 'react';
import { useCallback } from 'react';

interface IProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (newRowsPerPage: number) => void;
}

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
  },
});
const rowsPerPageOptions = [5, 10, 25];

export function DocumentsManageTablePagination({
  currentPage,
  onChangePage,
  onChangeRowsPerPage,
  rowsPerPage,
  totalRows,
}: IProps): JSX.Element {
  const classes = useStyles();
  const handlePageChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, page: number) => {
      onChangePage(page);
    },
    [onChangePage],
  );
  const handlePerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const { value } = event.target;

      onChangeRowsPerPage(Number(value));
    },
    [onChangeRowsPerPage],
  );

  return (
    <TablePagination
      className={classes.wrapper}
      component="div"
      page={currentPage}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePerPageChange}
      count={totalRows}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}
