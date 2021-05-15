import axios, { AxiosResponse } from 'axios';
import { IManageFilters } from '../../../common/interfaces/interfaces';
import {
  DocumentWithPreviews,
  IDocumentWithPagination,
} from '../views/DocumentsManage/interfaces/interfaces';
import { IDocumentSettingsFormData } from '../views/DocumentsSettings/interfaces/interfaces';

type GetDocumentsParams = Omit<IManageFilters, 'tags'> & {
  tags: string | string[];
  currentPage: number;
  rowsPerPage: number;
};

function createFormDataFromObject(data: object): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value[0] instanceof File) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else {
      formData.append(key, value);
    }
  }

  return formData;
}

export class ApplicationApi {
  public static logout(): Promise<void> {
    return axios.post('/logout');
  }

  public static createTag(tagName: string): Promise<string> {
    return axios
      .post('/data/tags', {
        tagName,
      })
      .then((response: AxiosResponse<string>) => response.data);
  }

  public static getTags(): Promise<string[]> {
    return axios
      .get('/data/tags')
      .then((response: AxiosResponse<string[]>) => response.data);
  }

  public static createDocument(
    formData: IDocumentSettingsFormData,
  ): Promise<void> {
    return axios.post('/data/document', createFormDataFromObject(formData));
  }

  public static editDocument(
    documentId: string,
    formData: IDocumentSettingsFormData,
  ): Promise<void> {
    return axios.put(
      `/data/document/${documentId}`,
      createFormDataFromObject(formData),
    );
  }

  public static deleteDocument(documentId: string): Promise<void> {
    return axios.delete(`/data/document/${documentId}`);
  }

  public static getDocuments(
    currentPage: number,
    rowsPerPage: number,
    manageFilters: IManageFilters,
  ): Promise<IDocumentWithPagination> {
    const params: GetDocumentsParams = {
      currentPage,
      rowsPerPage,
      ...manageFilters,
    };

    if (manageFilters.tags) {
      params.tags = manageFilters.tags.join(',');
    }

    return axios
      .get('/data/document', {
        params,
      })
      .then((response: AxiosResponse) => response.data);
  }

  public static getDocumentsAsBase64(id: string): Promise<string[]> {
    return axios
      .get(`data/document/${id}/base64`)
      .then((response) => response.data);
  }

  public static getDocument(id: string): Promise<DocumentWithPreviews> {
    return axios.get(`/data/document/${id}`).then((response) => response.data);
  }
}
