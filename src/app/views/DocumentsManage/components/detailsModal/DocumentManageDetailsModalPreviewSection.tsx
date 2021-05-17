import * as React from 'react';
import { Box } from '@material-ui/core';
import { AppLoader } from '../../../../components/Loader';
import { DocumentManageDetailsPreviewImage } from './DocumentManageDetailsPreviewImage';

interface IProps {
  images: string[];
  isLoading: boolean;
}

export function DocumentsManageDetailsModalPreviewSection({
  images,
  isLoading,
}: IProps): JSX.Element {
  return (
    <Box
      width="100%"
      height={72}
      position="relative"
      padding="4px 0"
      display="flex"
      flexDirection="row"
      justifyContent="space-evenly"
    >
      {isLoading ? (
        <AppLoader />
      ) : (
        images.map((src, index) => (
          <DocumentManageDetailsPreviewImage key={index} src={src} />
        ))
      )}
    </Box>
  );
}
