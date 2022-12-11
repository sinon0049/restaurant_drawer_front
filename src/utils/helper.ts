import axios from "axios";
import Swal from "sweetalert2";

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
