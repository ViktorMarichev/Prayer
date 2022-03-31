import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

// экземпляр axios
type paramsType = {
  token?: string | undefined;
};
export const apiInstance = (params: paramsType = {}) => {
  const token = params.token;
  const config = {
    baseURL: 'https://prayer.herokuapp.com',
    headers: {'Content-Type': 'application/json'},
    timeout: 1000,
  } as AxiosRequestConfig;

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return axios.create(config);
};
