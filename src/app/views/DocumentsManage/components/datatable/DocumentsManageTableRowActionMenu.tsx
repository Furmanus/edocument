import * as React from 'react';
import { useCallback, useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { DocumentsManageTexts } from '../../constants/documentsManageTexts';
import { IDocument } from '../../interfaces/interfaces';

interface IProps {
  handleDetailsClick: (document: IDocument) => void;
  document: IDocument;
}

export function DocumentsManageTableRowActionMenu({
  handleDetailsClick,
  document,
}: IProps): JSX.Element {
  const [anchorElement, setAnchorElement] = useState(null);
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      setAnchorElement(event.currentTarget);
    },
    [setAnchorElement],
  );
  const handleClose = useCallback(() => {
    setAnchorElement(null);
  }, [setAnchorElement]);
  const onDetailsClick = useCallback(() => {
    handleDetailsClick(document);
    handleClose();
  }, []);

  return (
    <React.Fragment>
      <IconButton
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon color="primary" />
      </IconButton>
      <Menu
        open={Boolean(anchorElement)}
        id="menu"
        keepMounted={true}
        onClose={handleClose}
        anchorEl={anchorElement}
      >
        <MenuItem onClick={onDetailsClick}>
          {DocumentsManageTexts.DataTableRowActionMenuDetails}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
