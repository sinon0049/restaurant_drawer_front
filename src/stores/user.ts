import { defineStore } from "pinia";
import { reactive } from "vue";
import type { OAuthUserData } from "env";

export const userStore = defineStore("userStore", () => {
  const defaultProfile: OAuthUserData = {
    id: -1,
    name: "",
    email: "",
    facebookId: "",
    googleId: "",
    isPwdSet: false,
  };
  const profile: OAuthUserData = reactive({ ...defaultProfile });

  function storeUser(user: OAuthUserData) {
    Object.assign(profile, user);
  }

  function cleanUser() {
    Object.assign(profile, defaultProfile);
  }

  return {
    profile,
    storeUser,
    cleanUser,
  };
});
