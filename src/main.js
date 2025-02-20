import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import dayjs from "dayjs";
import router from "./router/router.js";
import axios from "axios";
import mapboxgl from "mapbox-gl";

const app = createApp(App);
app.use(ElementPlus);
app.use(dayjs);
app.use(router);
app.use(createPinia());
app.mount("#app");

app.config.globalProperties.$axios = axios;

dayjs().format();
