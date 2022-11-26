import api from "@/utils/helper";
import type {
  facebookSignInData,
  googleSignInData,
  OAuthSignUpData,
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
    return api.post("/users/facebooksignin", signInData);
  },
  googleSignIn: function (signInData: googleSignInData) {
    return api.post("/users/googlesignin", signInData);
  },
  OAuthSignUp: function (signUpData: OAuthSignUpData) {
    return api.post("/users/oauthsignup", signUpData);
  },
};
