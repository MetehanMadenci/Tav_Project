import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import dayjs from "dayjs";
import router from "./router/router.js";
import axios from "axios";

const app = createApp(App);
app.use(ElementPlus);
app.use(dayjs);
app.use(router);
app.mount("#app");

app.config.globalProperties.$axios = axios;
/* app.config.globalProperties.$appAxios = appAxios; */

dayjs().format();
