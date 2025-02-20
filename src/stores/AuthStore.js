import { defineStore } from "pinia";
import authService from "../services/authService";

export const useAuthStore = defineStore("user", {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(username, password) {
      const user = await authService.login(username, password);
      if (user) {
        this.user = user;
      }
    },
    logout() {
      this.user = null;
      authService.logout();
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
