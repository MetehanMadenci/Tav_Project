import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import { ElMessage } from "element-plus";
import DefaultLayout from "../layouts/default.vue";

const routes = [
  {
    path: "/",
    component: () => import("../components/loginPage.vue"),
    name: "Login",
  },
  {
    path: "/",
    component: DefaultLayout,
    meta: { needAuth: true },
    children: [
      {
        path: "states",
        component: () => import("../components/PlaneTable.vue"),
        name: "States",
      },
      {
        path: "arrivals",
        component: () => import("../components/arrivalTable.vue"),
        name: "Arrivals",
      },
      {
        path: "departures",
        component: () => import("../components/departureTable.vue"),
        name: "Departures",
      },
      {
        path: "map",
        component: () => import("../components/mapPage.vue"),
        name: "Map",
      },
    ],
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
