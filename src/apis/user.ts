import api from "@/utils/helper";
import type {
  facebookSignInData,
  googleSignInData,
  signInData,
  signUpData,
} from "env";

export const usersAPI = {
  signIn: function (signInData: signInData) {
    return api.post("/users/signin", signInData);
  },
  signUp: function (signUpData: signUpData) {
    return api.post("/users/signup", signUpData);
  },
  facebookSignIn: function (signInData: facebookSignInData) {
    return api.post("/users/fbsignin", signInData);
  },
  googleSignIn: function (signInData: googleSignInData) {
    return api.post("users/googlesignin", signInData);
  },
};
