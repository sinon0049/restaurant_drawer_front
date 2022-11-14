import { createRouter, createWebHistory } from "vue-router";
import SignIn from "../views/SignIn.vue";
import RestDraw from "../views/RestDraw.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signin",
      name: "sign-in",
      component: SignIn,
    },
    {
      path: "/restdraw",
      name: "rest-draw",
      component: RestDraw,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const pathWithoutAuth = ["/signin", "/signup"];
  const token = localStorage.getItem("token");
  if (token && pathWithoutAuth.includes(to.fullPath)) {
    router.push({ name: "rest-draw" });
  } else if (!token && !pathWithoutAuth.includes(to.fullPath)) {
    router.push({ name: "sign-in" });
  }
  next();
});

export default router;
