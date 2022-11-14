import api from "@/utils/helper";
import type { signInData, signUpData } from "env";

export const usersAPI = {
  signIn: function (signInData: signInData) {
    return api.post("/users/signin", signInData);
  },
  signUp: function (signUpData: signUpData) {
    return api.post("/users/signup", signUpData);
  },
};
