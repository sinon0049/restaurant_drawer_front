import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import RestDraw from "../views/RestDraw.vue";
import OAuthSignUp from "@/views/OAuthSignUp.vue";
import UserProfile from "@/views/UserProfile.vue";
import RestaurantRecord from "@/views/RestaurantRecord.vue";
import HomePage from "@/views/HomePage.vue";
import { usersAPI } from "@/apis/user";
import { userStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home-page",
      component: HomePage,
    },
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
    {
      path: "/record",
      name: "restaurant-record",
      component: RestaurantRecord,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const pathWithoutAuth = ["/signin", "/signup", "/oauthsignup", "/", "/#card-1", "/#card-2", "/#card-3"];
  const token = localStorage.getItem("token");
  const store = userStore();
  console.log(to.fullPath)
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
