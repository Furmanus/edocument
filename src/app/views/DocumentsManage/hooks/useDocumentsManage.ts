import { useEffect, useReducer } from 'react';
import { IDocument } from '../interfaces/interfaces';
import { ApplicationApi } from '../../../api/api';

interface IDocumentsManageState {
  documents: IDocument[];
  isFetching: boolean;
  totalDocuments: number;
  currentPage: number;
  rowsPerPage: number;
}

type Action =
  | { type: 'fetch_documents' }
  | {
      type: 'fetch_documents_success';
      documents: IDocument[];
      totalCount: number;
    }
  | { type: 'change_page'; newPage: number }
  | { type: 'change_per_page'; newPerPage: number };

type HookReturnType = {
  documents: IDocument[];
  isFetching: boolean;
  fetchDocuments: () => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  totalDocuments: number;
  currentPage: number;
  rowsPerPage: number;
};

const initialState: IDocumentsManageState = {
  documents: null,
  isFetching: false,
  totalDocuments: null,
  currentPage: 0,
  rowsPerPage: 5,
};

function documentsManageReducer(
  state: IDocumentsManageState,
  action: Action,
): IDocumentsManageState {
  switch (action.type) {
    case 'fetch_documents':
      return {
        ...state,
        documents: null,
        isFetching: true,
      };
    case 'fetch_documents_success':
      return {
        ...state,
        documents: action.documents,
        totalDocuments: action.totalCount,
        isFetching: false,
      };
    case 'change_page':
      return {
        ...state,
        currentPage: action.newPage,
      };
    case 'change_per_page':
      return {
        ...state,
        rowsPerPage: action.newPerPage,
      };
  }

  return state;
}

export function useDocumentsManage(): HookReturnType {
  const [state, dispatch] = useReducer(documentsManageReducer, initialState);
  const {
    currentPage,
    documents,
    isFetching,
    rowsPerPage,
    totalDocuments,
  } = state;
  const fetchDocuments = (): void => {
    dispatch({ type: 'fetch_documents' });

    ApplicationApi.getDocuments(currentPage, rowsPerPage).then((result) => {
      const { totalCount, documents } = result;

      dispatch({ type: 'fetch_documents_success', documents, totalCount });
    });
  };
  const onPageChange = (page: number): void => {
    dispatch({ type: 'change_page', newPage: page });
  };
  const onPerPageChange = (perPage: number): void => {
    dispatch({ type: 'change_per_page', newPerPage: perPage });
  };

  useEffect(fetchDocuments, [currentPage, rowsPerPage]);

  return {
    totalDocuments,
    currentPage,
    rowsPerPage,
    documents,
    isFetching,
    onPageChange,
    onPerPageChange,
    fetchDocuments,
  };
}
