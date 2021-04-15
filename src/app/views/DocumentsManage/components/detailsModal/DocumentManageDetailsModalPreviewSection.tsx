import * as React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { AppLoader } from '../../../../components/Loader';

interface IProps {
  images: string[];
  isLoading: boolean;
}

const useStyles = makeStyles({
  imageWrapper: {
    height: '100%',
    width: 64,
    objectFit: 'contain',
  },
});
// TODO czasami dziwnie ucina obrazki - zbadać czemu
export function DocumentsManageDetailsModalPreviewSection({
  images,
  isLoading,
}: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Box
      width="100%"
      height={64}
      position="relative"
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
    >
      {isLoading ? (
        <AppLoader />
      ) : (
        images.map((src, index) => (
          <img
            className={classes.imageWrapper}
            key={index}
            src={`data:image/png; base64, ${src}`}
            alt="preview"
          />
        ))
      )}
    </Box>
  );
}
