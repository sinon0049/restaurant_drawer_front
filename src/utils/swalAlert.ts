import Swal from "sweetalert2";

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
