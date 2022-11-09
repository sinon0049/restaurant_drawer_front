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

export default router;
