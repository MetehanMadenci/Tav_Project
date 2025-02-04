import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  /* {
    path: "/",
    component: () => import("./components/loginPage.vue"),
  }, */

  {
    path: "/",
    component: () => import("../components/PlaneTable.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
