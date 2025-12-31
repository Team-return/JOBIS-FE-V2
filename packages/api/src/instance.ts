import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { config } from "./config";

interface AuthData {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
}

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const cookie = new Cookies();

const forRefresh = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout
});

export const instance = axios.create({
  baseURL: config.baseUrl,
  timeout: config.timeout
});

export const setCookie = (key: string, value: string, expires?: Date) => {
  cookie.set(key, value, {
    path: "/",
    expires
  });
};

export const removeCookie = (key: string) => {
  cookie.remove(key, { path: "/" });
};

export const setToken = (data: AuthData) => {
  setCookie(
    ACCESS_TOKEN_KEY,
    data.access_token,
    new Date(data.access_expires_at)
  );
  setCookie(
    REFRESH_TOKEN_KEY,
    data.refresh_token,
    new Date(data.refresh_expires_at)
  );
};

export const resetToken = () => {
  removeCookie(ACCESS_TOKEN_KEY);
  removeCookie(REFRESH_TOKEN_KEY);
};

instance.interceptors.request.use(
  config => {
    const accessToken = cookie.get(ACCESS_TOKEN_KEY);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const statusCode = error.response?.status ?? error.status;
    if (statusCode && statusCode >= 500) {
      try {
        await axios.get(`${config.baseUrl}/`);
      } catch (healthError) {
        if (healthError instanceof AxiosError) {
          config.onServerError?.(healthError);
        } else {
          throw statusCode;
        }
      }
      throw statusCode;
    }

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
          resetToken();
          window.location.href = "/login";
          return;
        }

        const { data } = await forRefresh.put<AuthData>(
          "/auth/reissue?platform-type=WEB",
          null,
          {
            headers: {
              "X-Refresh-Token": refreshToken
            }
          }
        );

        setToken(data);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return instance(originalRequest);
      } catch (refreshError) {
        resetToken();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    throw statusCode;
  }
);
