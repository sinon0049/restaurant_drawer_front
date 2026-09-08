import api from "@/utils/helper";
import type {
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
  signOut: function () {
    return api.post("/users/signout");
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
  oauthDisconnect: function (payLoad: UpdatedProfile) {
    return api.post("/users/oauth/disconnect", payLoad);
  },
};
