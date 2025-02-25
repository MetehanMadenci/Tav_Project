import { ElMessage } from "element-plus";
const USER = import.meta.env.VITE_USER;
const PASS = import.meta.env.VITE_PASS;
export default {
  async login(username, password) {
    if (username === USER && password === PASS) {
      return { username };
    }
    return null;
  },
  logout() {
    /* ElMessage({
      message: "User logged out!",
      duration: 3000,
      showClose: true,
      customClass: "error-message",
    }); */
  },
};
