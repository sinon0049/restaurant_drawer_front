import api from "@/utils/helper";
import type { signInData } from "env";

export const usersAPI = {
  signIn: function (signInData: signInData) {
    return api.post("/users/signin", signInData);
  },
};
