import axios from 'axios';
import envConfig from 'src/environment';

export const baseUrl = envConfig.baseUrl;

const client = axios.create({ baseURL: baseUrl });

export const request = async ({ ...options }) => {
  client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('at-token')}`;
  const onSuccess = (response: any) => response;
  const onError = (error: any) => {
  console.error(error)
    return error;
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('at-token')}`,
  },
});

export default {
  get: <T>(url: string, params?: object) => axiosInstance.get<T>(url, { ...params }),
  post: <T>(url: string, data: any) => axiosInstance.post<T>(url, data, {}),
  patch: <T>(url: string, data: any) => axiosInstance.patch<T>(url, data, {}),
  delete: <T>(url: string) => axiosInstance.delete<T>(url, {}),
};
