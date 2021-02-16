import axios from 'axios';

export class ApplicationApi {
  public static logout(): Promise<void> {
    return axios.post('/app/logout');
  }
}
