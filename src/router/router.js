import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/loginPage.vue"),
    name: "Login",
  },

  {
    path: "/states",
    component: () => import("../components/planeTable.vue"),
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
  {
    path: "/map",
    component: () => import("../components/mapPage.vue"),
    name: "Map",
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
