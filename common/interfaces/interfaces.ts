export interface IApiError {
  errorCode: number;
  message?: string;
  fieldName?: string;
}

export interface IManageFilters {
  name: string;
  minDate: string;
  maxDate: string;
  tags: string[];
}

export type IManageFiltersApi = Partial<
  Omit<IManageFilters, 'tags'> & { tags: string }
>;
