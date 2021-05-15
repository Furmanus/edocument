import { useEffect, useReducer } from 'react';
import { IDocument } from '../interfaces/interfaces';
import { ApplicationApi } from '../../../api/api';
import { IManageFilters } from '../../../../../common/interfaces/interfaces';

interface IDocumentsManageState {
  documents: IDocument[];
  isFetching: boolean;
  totalDocuments: number;
  currentPage: number;
  rowsPerPage: number;
  isFiltersModalOpen: boolean;
  manageFilters: IManageFilters;
  userTags: string[];
  isFetchingTags: boolean;
}

type Action =
  | { type: 'fetch_documents' }
  | {
      type: 'fetch_documents_success';
      documents: IDocument[];
      totalCount: number;
    }
  | { type: 'change_page'; newPage: number }
  | { type: 'change_per_page'; newPerPage: number }
  | { type: 'open_filters_modal' }
  | { type: 'close_filters_modal' }
  | { type: 'change_filters'; newFilters: IManageFilters }
  | { type: 'fetch_tags' }
  | { type: 'fetch_tags_success'; userTags: string[] };

type HookReturnType = {
  documents: IDocument[];
  isFetching: boolean;
  fetchDocuments: () => void;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  totalDocuments: number;
  currentPage: number;
  rowsPerPage: number;
  isFiltersModalOpen: boolean;
  manageFilters: IManageFilters;
  onFiltersButtonClick: () => void;
  onFiltersModalClose: () => void;
  onFiltersModalSave: (filters: IManageFilters) => void;
  userTags: string[];
};

const initialState: IDocumentsManageState = {
  documents: null,
  isFetching: false,
  totalDocuments: null,
  currentPage: 0,
  rowsPerPage: 5,
  isFiltersModalOpen: false,
  manageFilters: {
    name: null,
    tags: [],
    maxDate: null,
    minDate: null,
  },
  userTags: [],
  isFetchingTags: false,
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
    case 'open_filters_modal':
      return {
        ...state,
        isFiltersModalOpen: true,
      };
    case 'close_filters_modal':
      return {
        ...state,
        isFiltersModalOpen: false,
      };
    case 'change_filters':
      return {
        ...state,
        manageFilters: action.newFilters,
        isFiltersModalOpen: false,
      };
    case 'fetch_tags':
      return {
        ...state,
        isFetchingTags: true,
      };
    case 'fetch_tags_success':
      return {
        ...state,
        isFetchingTags: false,
        userTags: action.userTags,
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
    isFiltersModalOpen,
    manageFilters,
    userTags,
    isFetchingTags,
  } = state;
  const fetchDocuments = (): void => {
    dispatch({ type: 'fetch_documents' });

    ApplicationApi.getDocuments(currentPage, rowsPerPage, manageFilters).then(
      (documentsResult) => {
        const { documents, totalCount } = documentsResult;

        dispatch({ type: 'fetch_documents_success', documents, totalCount });
      },
    );
  };
  const fetchTags = (): void => {
    dispatch({ type: 'fetch_tags' });

    ApplicationApi.getTags().then((tags) => {
      dispatch({ type: 'fetch_tags_success', userTags: tags });
    });
  };
  const onPageChange = (page: number): void => {
    dispatch({ type: 'change_page', newPage: page });
  };
  const onPerPageChange = (perPage: number): void => {
    dispatch({ type: 'change_per_page', newPerPage: perPage });
  };
  const onFiltersButtonClick = () => {
    dispatch({ type: 'open_filters_modal' });
  };
  const onFiltersModalClose = () => {
    dispatch({ type: 'close_filters_modal' });
  };
  const onFiltersModalSave = (newFilters: IManageFilters) => {
    dispatch({ type: 'change_filters', newFilters });
  };

  useEffect(fetchDocuments, [currentPage, rowsPerPage, manageFilters]);
  useEffect(fetchTags, []);

  return {
    isFetching: isFetching || isFetchingTags,
    totalDocuments,
    currentPage,
    rowsPerPage,
    documents,
    onPageChange,
    onPerPageChange,
    fetchDocuments,
    onFiltersButtonClick,
    onFiltersModalClose,
    onFiltersModalSave,
    isFiltersModalOpen,
    manageFilters,
    userTags,
  };
}
