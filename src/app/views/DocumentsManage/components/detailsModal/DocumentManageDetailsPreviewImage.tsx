import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { useContext, useState } from 'react';
import { AppContext } from '../../../../AppRoot';
import {
  openImageModalAction,
  openSnackBarAction,
} from '../../../../actions/appActions';
import PreviewUnavailableImage from '../../../../../common/assets/unavailable.png';
import { DocumentsManageTexts } from '../../constants/documentsManageTexts';

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
    cursor: 'pointer',
  },
});

export function DocumentManageDetailsPreviewImage({
  src,
}: IProps): JSX.Element {
  const classes = useStyles();
  const { dispatch } = useContext(AppContext);
  const [imageSrc, setImageSrc] = useState<string>(src);
  const onImageClick = () => {
    dispatch(openImageModalAction(imageSrc));
  };
  const onImageError = () => {
    setImageSrc(PreviewUnavailableImage);
    dispatch(
      openSnackBarAction(
        DocumentsManageTexts.PreviewImageUnavailable,
        'warning',
      ),
    );
  };

  return (
    <img
      className={classes.imageWrapper}
      src={imageSrc}
      alt="preview"
      onClick={onImageClick}
      onError={onImageError}
    />
  );
}
