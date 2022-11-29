import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import RestDraw from "../views/RestDraw.vue";
import OAuthSignUp from "@/views/OAuthSignUp.vue";
import UserProfile from "@/views/UserProfile.vue";
import { usersAPI } from "@/apis/user";
import { userStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/signup",
      name: "sign-up",
      component: SignUp,
    },
    {
      path: "/restdraw",
      name: "rest-draw",
      component: RestDraw,
    },
    {
      path: "/oauthsignup",
      name: "oauth-signup",
      component: OAuthSignUp,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const pathWithoutAuth = ["/signin", "/signup", "/oauthsignup"];
  const token = localStorage.getItem("token");
  const store = userStore();
  if (token && pathWithoutAuth.includes(to.fullPath)) {
    const { data } = await usersAPI.getCurrentUser();
    store.storeUser(data);
    router.push({ name: "rest-draw" });
  } else if (!token && !pathWithoutAuth.includes(to.fullPath)) {
    router.push({ name: "sign-in" });
  } else if (token) {
    const { data } = await usersAPI.getCurrentUser();
    store.storeUser(data);
  }
  next();
});

export default router;
