import * as React from 'react';
import { IconButton, makeStyles, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useCallback } from 'react';
import { AppNavigationTexts } from '../constants/appNavigationTexts';
import { ApplicationApi } from '../api/api';
import { NavigationHelper } from '../utils/navigation';

const useStyles = makeStyles({
  icon: {
    width: 28,
    height: 28,
    color: 'white',
  },
});

async function handleLogoutClick(): Promise<void> {
  await ApplicationApi.logout();

  NavigationHelper.reloadPage();
}

export function AppNavigationMenu(): JSX.Element {
  const classes = useStyles();
  const [anchorElement, setAnchorElement] = React.useState(null);
  const isOpen = Boolean(anchorElement);
  const handleClick = useCallback((event) => {
    setAnchorElement(event.currentTarget);
  }, []);
  const handleClose = useCallback(() => {
    setAnchorElement(null);
  }, []);

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircle className={classes.icon} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorElement}
        keepMounted
        open={isOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogoutClick}>
          {AppNavigationTexts.NavMenuLogout}
        </MenuItem>
      </Menu>
    </div>
  );
}
