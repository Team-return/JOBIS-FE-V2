import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { config } from "./config";

interface AuthData {
  access_token: string;
  access_expires_at: string;
  refresh_token: string;
  refresh_expires_at: string;
}

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const cookie = new Cookies();

const forHealthCheck = axios.create({
  baseURL: config.baseUrl
});

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
    secure: true,
    sameSite: "strict",
    expires
  });
};

export const removeCookie = (key: string) => {
  cookie.remove(key, { path: "/" });
};

export const getCookie = (key: string) => {
  return (cookie.get(key) ?? "") as string;
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
    if (error.code === "ECONNABORTED") {
      return Promise.reject(
        new Error("서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.")
      );
    }
    const originalRequest = error.config as RetryConfig;

    const statusCode = error.response?.status;
    if (statusCode && statusCode >= 500) {
      try {
        await forHealthCheck.get("/");
      } catch (healthError) {
        if (healthError instanceof AxiosError) {
          config.onServerError?.(healthError);
        } else {
          throw statusCode;
        }
      }
      throw statusCode;
    }

    if ((statusCode === 401 || statusCode === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      // try {
      //   const refreshToken = cookie.get(REFRESH_TOKEN_KEY);

      //   // if (!refreshToken) {
      //   //   resetToken();
      //   //   window.location.href = "/login";
      //   //   throw 401;
      //   // }

      //   const { data } = await forRefresh.put<AuthData>(
      //     "/auth/reissue?platform-type=WEB",
      //     null,
      //     {
      //       headers: {
      //         "X-Refresh-Token": refreshToken
      //       }
      //     }
      //   );

      //   setToken(data);

      //   originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

      //   return instance(originalRequest);
      // } catch {
      //   resetToken();
      //   window.location.href = "/login";
      //   throw 401;
      // }
    }

    throw statusCode;
  }
);
