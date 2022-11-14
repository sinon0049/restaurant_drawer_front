import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token)
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    return config;
  },
  (error) => {
    console.log(error);
  }
);

export default apiInstance;
