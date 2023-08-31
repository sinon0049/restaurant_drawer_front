import api from "@/utils/helper";
import type {
  facebookSignInData,
  googleSignInData,
  OAuthSignUpData,
  signInData,
  signUpData,
  updatedProfile,
  updatedPassword,
} from "env";

export const usersAPI = {
  signIn: function (payLoad: signInData) {
    return api.post("/users/signin", payLoad);
  },
  signUp: function (payLoad: signUpData) {
    return api.post("/users/signup", payLoad);
  },
  facebookSignIn: function (payLoad: facebookSignInData) {
    return api.post("/users/facebooksignin", payLoad);
  },
  googleSignIn: function (payLoad: googleSignInData) {
    return api.post("/users/googlesignin", payLoad);
  },
  OAuthSignUp: function (payLoad: OAuthSignUpData) {
    return api.post("/users/oauthsignup", payLoad);
  },
  getCurrentUser: function () {
    return api.get("/users/current_user");
  },
  updateProfile: function (payLoad: updatedProfile) {
    return api.put("/users/profile", payLoad);
  },
  updatePassword: function (payLoad: updatedPassword) {
    return api.put("/users/password", payLoad);
  },
  connectFacebookAccount: function (payLoad: updatedProfile) {
    return api.put("/users/fbaccount", payLoad);
  },
  connectGoogleAccount: function (payLoad: updatedProfile) {
    return api.put("/users/gaccount", payLoad);
  },
};
