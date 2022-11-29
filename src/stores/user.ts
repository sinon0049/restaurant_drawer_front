import { defineStore } from "pinia";
import { reactive } from "vue";
import type { OAuthUserData } from "env";

export const userStore = defineStore("userStore", () => {
  const profile: OAuthUserData = reactive({
    id: -1,
    name: "",
    email: "",
    facebookId: "",
    googleId: "",
  });

  function storeUser(user: OAuthUserData) {
    profile.id = user.id;
    profile.name = user.name;
    profile.email = user.email;
    profile.facebookId = user.facebookId;
    profile.googleId = user.googleId;
  }

  function cleanUser() {
    profile.id = -1;
    profile.name = "";
    profile.email = "";
    profile.facebookId = "";
    profile.googleId = "";
  }

  return {
    profile,
    storeUser,
    cleanUser,
  };
});
