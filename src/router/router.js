import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/LoginPage.vue"),
    name: "Login",
  },

  {
    path: "/states",
    component: () => import("../components/PlaneTable.vue"),
    name: "States",
  },
  {
    path: "/arrivals",
    component: () => import("../components/arrivalTable.vue"),
    name: "Arrivals",
  },
  {
    path: "/departures",
    component: () => import("../components/departureTable.vue"),
    name: "Departures",
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
