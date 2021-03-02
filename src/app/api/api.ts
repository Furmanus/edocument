import axios from 'axios';

export class ApplicationApi {
  public static logout(): Promise<void> {
    return axios.post('/app/logout');
  }

  public static createTag(tagName: string): Promise<void> {
    return axios.post('/data/tags', {
      tagName,
    });
  }
}
