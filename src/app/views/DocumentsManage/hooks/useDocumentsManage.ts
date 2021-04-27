import { useEffect, useState } from 'react';
import { IDocument } from '../interfaces/interfaces';
import { ApplicationApi } from '../../../api/api';

interface IHookState {
  documents: IDocument[];
  isFetching: boolean;
}

export function useDocumentsManage(): [IDocument[], boolean, () => void] {
  const [state, setState] = useState<IHookState>({
    documents: null,
    isFetching: false,
  });
  const fetchDocuments = (): void => {
    setState({
      isFetching: true,
      documents: null,
    });

    ApplicationApi.getDocuments().then((documents) => {
      setState({
        isFetching: false,
        documents,
      });
    });
  };

  useEffect(fetchDocuments, []);

  return [state.documents, state.isFetching, fetchDocuments];
}
