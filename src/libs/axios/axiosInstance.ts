import axios, {AxiosInstance, CreateAxiosDefaults} from "axios";
import Cookies from 'js-cookie';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_V1_URL;

const defaultOptions = {
  baseURL: BASE_API_URL,
  timeout: 15000,
  withCredentials: true
};

export const generalErrorMessage: Record<string, any> = {
  en: {
    network_error: "Unstable connection. Please check your network.",
    server_error: "Server is experiencing issues. Please try again later.",
    timeout_error: "Response timed out.",
    default: "An error has occurred."
  },
  vi: {
    network_error: "Kết nối không ổn định. Vui lòng kiểm tra mạng.",
    server_error: "Máy chủ đang gặp sự cố. Vui lòng thử lại sau.",
    timeout_error: "Hết thời gian chờ phản hồi.",
    default: "Đã có lỗi xảy ra."
  }
}

// --- Factory Pattern ---
const createAxiosClient = (options: CreateAxiosDefaults = {}): AxiosInstance => {
  const instance = axios.create({...defaultOptions, ...options});
  
  instance.interceptors.request.use(
    (config) => {
      if (typeof window !== 'undefined') {
        // Add locale for every request
        const currentLocale = Cookies.get('NEXT_LOCALE') || 'vi';
        if (config.headers) {
          config.headers['Accept-Language'] = currentLocale;
        }
      }
      return config;
    },
    
    (error) => {
      return Promise.reject(error);
    });
  
  return instance;
};

export const publicAxiosInstance = createAxiosClient();

export const verifyAxiosInstance = createAxiosClient();

export const refreshTokenInstance = createAxiosClient();

export const reloginInstance = createAxiosClient();