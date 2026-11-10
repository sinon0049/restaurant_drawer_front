import axios from "axios";
import Swal from "sweetalert2";

let csrfToken: string | null = null;

const setCsrfToken = (token: string) => {
  csrfToken = token
};

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
  const method = config.method?.toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method ?? "") && csrfToken) {
    config.headers.set("X-CSRF-Token", csrfToken);
  }

  return config;
});

export { apiInstance, setCsrfToken };
export const swalAlert = {
  successMsg: function (msg: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      text: msg,
    });
  },
  errorMsg: function (msg: string) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
      text: msg,
    });
  },
};
