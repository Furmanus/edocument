import { useEffect, useState } from 'react';
import { ApplicationApi } from '../../../api/api';

interface IPreviewUseState {
  isLoading: boolean;
  filesImages: string[];
}

export function useDocumentsDetailsPreview(
  documentId: string,
): [string[], boolean] {
  const [previewState, setPreviewState] = useState<IPreviewUseState>({
    isLoading: false,
    filesImages: null,
  });

  useEffect(() => {
    if (documentId) {
      setPreviewState({
        ...previewState,
        isLoading: true,
      });

      ApplicationApi.getDocumentsAsBase64(documentId).then((images) => {
        setPreviewState({
          isLoading: false,
          filesImages: images,
        });
      });
    }
  }, [documentId]);

  return [previewState.filesImages, previewState.isLoading];
}
