import api from "@/utils/helper";
import type { facebookSignInData, signInData, signUpData } from "env";

export const usersAPI = {
  signIn: function (signInData: signInData) {
    return api.post("/users/signin", signInData);
  },
  signUp: function (signUpData: signUpData) {
    return api.post("/users/signup", signUpData);
  },
  fbSignIn: function (signInData: facebookSignInData) {
    return api.post("/users/fbsignin", signInData);
  },
};
