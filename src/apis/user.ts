import api from "@/utils/helper";
import type {
  FacebookSignInData,
  GoogleSignInData,
  OAuthSignUpData,
  SignInData,
  SignUpData,
  UpdatedProfile,
  UpdatedPassword,
} from "env";

export const usersAPI = {
  signIn: function (payLoad: SignInData) {
    return api.post("/users/signin", payLoad);
  },
  signUp: function (payLoad: SignUpData) {
    return api.post("/users/signup", payLoad);
  },
  facebookSignIn: function (payLoad: FacebookSignInData) {
    return api.post("/users/facebooksignin", payLoad);
  },
  googleSignIn: function (payLoad: GoogleSignInData) {
    return api.post("/users/googlesignin", payLoad);
  },
  OAuthSignUp: function (payLoad: OAuthSignUpData) {
    return api.post("/users/oauthsignup", payLoad);
  },
  getCurrentUser: function () {
    return api.get("/users/current_user");
  },
  updateProfile: function (payLoad: UpdatedProfile) {
    return api.put("/users/profile", payLoad);
  },
  updatePassword: function (payLoad: UpdatedPassword) {
    return api.put("/users/password", payLoad);
  },
  connectFacebookAccount: function (payLoad: UpdatedProfile) {
    return api.put("/users/fbaccount", payLoad);
  },
  connectGoogleAccount: function (payLoad: UpdatedProfile) {
    return api.put("/users/gaccount", payLoad);
  },
};
