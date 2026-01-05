import {generalErrorMessage, publicAxiosInstance} from "@/libs/axios/axiosInstance";
import axios, {AxiosRequestConfig} from "axios";
import {toast} from "sonner";
import Cookies from "js-cookie";

publicAxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

publicAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  
  (error) => {
    let locale = 'vi'; // Default
    if (typeof window !== 'undefined') {
      locale = document.documentElement.lang || Cookies.get('NEXT_LOCALE') || 'vi';
    }
    
    const t = generalErrorMessage[locale] || generalErrorMessage['vi'];
    
    // Bắt lỗi mạng/server
    if (error === null) {
      toast.error(t.server_error);
      return Promise.reject(new Error(t.server_error));
    } else if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        toast.error(t.network_error);
        return Promise.reject(error);
      } else if (!error.response) {
        toast.error(t.default);
        return Promise.reject(error);
      } else {
        toast.error(error.response.data.message);
        return Promise.reject(error);
      }
    }
  }
);

export default {
  async get<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.get(endpoint, option);
  },
  async post<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.post(endpoint, data, option);
  },
  async put<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.put(endpoint, data, option);
  },
  async patch<T>(
    endpoint: string,
    data?: any,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.patch(endpoint, data, option);
  },
  async delete<T>(
    endpoint: string,
    option?: AxiosRequestConfig<never>
  ): Promise<T> {
    return await publicAxiosInstance.delete(endpoint, option);
  },
  setDefaultHeader(key: string, data?: string) {
    publicAxiosInstance.defaults.headers.common[key] = data;
    console.log(data);
  },
}