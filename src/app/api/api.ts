import axios, { AxiosResponse } from 'axios';

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
}
