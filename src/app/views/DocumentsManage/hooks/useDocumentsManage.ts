import { useEffect, useState } from 'react';
import { IDocument } from '../interfaces/interfaces';
import { ApplicationApi } from '../../../api/api';

interface IHookState {
  documents: IDocument[];
  isFetching: boolean;
}

export function useDocumentsManage(): [IDocument[], boolean] {
  const [state, setState] = useState<IHookState>({
    documents: null,
    isFetching: false,
  });

  useEffect(() => {
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
  }, []);

  return [state.documents, state.isFetching];
}
