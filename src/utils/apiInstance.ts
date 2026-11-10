import axios from "axios";

let csrfToken: string | null = null;

const setCsrfToken = (token: string) => {
  csrfToken = token;
};

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method ?? "") && csrfToken) {
    config.headers = config.headers ?? {};
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

export { apiInstance, setCsrfToken };
