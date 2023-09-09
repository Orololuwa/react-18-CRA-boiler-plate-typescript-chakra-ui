import axios, { AxiosRequestHeaders } from "axios";

import { tokenKey, ExpirySession } from "../utils";
import { baseURL } from "./app.config";

export const authInstance = axios.create({
  baseURL,
});

export const authHeader = async (
  headers: Partial<AxiosRequestHeaders>
): Promise<Partial<AxiosRequestHeaders>> => {
  const accessToken = await ExpirySession.get(tokenKey);
  return {
    ...headers,
    Authorization: accessToken,
  };
};

authInstance.interceptors.request.use(async (config) => {
  const requestConfig = { ...config };
  const { headers } = config;
  requestConfig.headers = (await authHeader(headers)) as AxiosRequestHeaders;

  return requestConfig;
});

authInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;

    if (response && response.status === 401) {
      ExpirySession.clear();
      return window.location.reload();
      // return (window.location.href = "/auth/login");
    }
    if (response && response.status === 403) {
      return (window.location.href = "/forbidden");
    }

    return Promise.reject(error);
  }
);

export const publicInstance = axios.create({
  baseURL,
});
