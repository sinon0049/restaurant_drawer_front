import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import RestDraw from "../views/RestDraw.vue";
import OAuthSignUp from "@/views/OAuthSignUp.vue";

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
  ],
});

router.beforeEach((to, from, next) => {
  const pathWithoutAuth = ["/signin", "/signup", "/oauthsignup"];
  const token = localStorage.getItem("token");
  if (token && pathWithoutAuth.includes(to.fullPath)) {
    router.push({ name: "rest-draw" });
  } else if (!token && !pathWithoutAuth.includes(to.fullPath)) {
    router.push({ name: "sign-in" });
  }
  next();
});

export default router;
