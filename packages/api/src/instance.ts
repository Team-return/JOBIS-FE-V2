import axios, { type InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { config } from "./config";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const cookie = new Cookies();

const forRefresh = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: config.timeout
});

export const instance = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: config.timeout
});

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
  async error => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status && error.response.status >= 500) {
      try {
        await axios.get(`${import.meta.env.BASE_URL}/`);
      } catch (healthError) {
        config.onServerError(healthError);
      }
      throw error;
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
          cookie.remove(ACCESS_TOKEN_KEY);
          cookie.remove(REFRESH_TOKEN_KEY);
          window.location.href = "/login";
          return;
        }

        const { data } = await forRefresh.put<{
          access_token: string;
          access_expires_at: string;
          refresh_token: string;
          refresh_expires_at: string;
          authority: string;
        }>("/auth/reissue?platform-type=WEB", null, {
          headers: {
            "X-Refresh-Token": refreshToken
          }
        });

        cookie.set(ACCESS_TOKEN_KEY, data.access_token, {
          path: "/",
          expires: new Date(data.access_expires_at)
        });
        cookie.set(REFRESH_TOKEN_KEY, data.refresh_token, {
          path: "/",
          expires: new Date(data.refresh_expires_at)
        });

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

        return instance(originalRequest);
      } catch (refreshError) {
        cookie.remove(ACCESS_TOKEN_KEY);
        cookie.remove(REFRESH_TOKEN_KEY);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    throw error;
  }
);

export const setToken = ({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  cookie.set(ACCESS_TOKEN_KEY, accessToken);
  cookie.set(REFRESH_TOKEN_KEY, refreshToken);
};
