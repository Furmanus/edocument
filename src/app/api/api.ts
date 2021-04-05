import axios, { AxiosResponse } from 'axios';
import { IDocument } from '../views/DocumentsManage/interfaces/interfaces';
import { IDocumentSettingsFormData } from '../views/DocumentsSettings/interfaces/interfaces';

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
    return axios.post('/app/logout');
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

  public static getDocuments(): Promise<IDocument[]> {
    return axios
      .get('/data/document')
      .then((response: AxiosResponse) => response.data);
  }
}
