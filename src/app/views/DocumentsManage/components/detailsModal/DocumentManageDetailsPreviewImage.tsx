import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { useContext } from 'react';
import { AppContext } from '../../../../AppRoot';
import { openImageModalAction } from '../../../../actions/appActions';

interface IProps {
  src: string;
}

const useStyles = makeStyles({
  imageWrapper: {
    height: '100%',
    width: 64,
    objectFit: 'contain',
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.3s ease-in-out',
  },
});

export function DocumentManageDetailsPreviewImage({
  src,
}: IProps): JSX.Element {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const onImageClick = () => {
    dispatch(openImageModalAction(src));
  };

  return (
    <img
      className={classes.imageWrapper}
      src={src}
      alt="preview"
      onClick={onImageClick}
    />
  );
}
