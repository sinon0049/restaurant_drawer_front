import { apiInstance } from "@/utils/apiInstance";
import type {
  SignInData,
  SignUpData,
  UpdatedProfile,
  UpdatedPassword,
} from "env";

export const usersAPI = {
  signIn: function (payLoad: SignInData) {
    return apiInstance.post("/users/signin", payLoad);
  },
  signUp: function (payLoad: SignUpData) {
    return apiInstance.post("/users/signup", payLoad);
  },
  signOut: function () {
    return apiInstance.post("/users/signout");
  },
  getCurrentUser: function () {
    return apiInstance.get("/users/current_user");
  },
  updateProfile: function (payLoad: UpdatedProfile) {
    return apiInstance.put("/users/profile", payLoad);
  },
  updatePassword: function (payLoad: UpdatedPassword) {
    return apiInstance.put("/users/password", payLoad);
  },
  oauthDisconnect: function (payLoad: UpdatedProfile) {
    return apiInstance.post("/users/oauth/disconnect", payLoad);
  },
  getCsrftoken: function () {
    return apiInstance.get("/users/csrf_token");
  },
};
