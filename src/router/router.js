import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import { ElMessage } from "element-plus";

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
    meta: { needAuth: true },
  },
  {
    path: "/arrivals",
    component: () => import("../components/arrivalTable.vue"),
    name: "Arrivals",
    meta: { needAuth: true },
  },
  {
    path: "/departures",
    component: () => import("../components/departureTable.vue"),
    name: "Departures",
    meta: { needAuth: true },
  },
  {
    path: "/map",
    component: () => import("../components/mapPage.vue"),
    name: "Map",
    meta: { needAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.needAuth && !authStore.isAuthenticated) {
    ElMessage({
      message: "You must log in!",
      duration: 3000,
      showClose: true,
      customClass: "error-message",
    });
    next("/");
  } else {
    next();
  }
});

export default router;
