import axios, { AxiosResponse } from 'axios';

export function createUserApi(
  userName: string,
  password: string,
): Promise<AxiosResponse<void>> {
  return axios.post('/users', {
    userName,
    password,
  });
}

export function loginUserApi(
  userName: string,
  password: string,
): Promise<AxiosResponse<void>> {
  return axios.post('/users/auth', {
    userName,
    password,
  });
}
