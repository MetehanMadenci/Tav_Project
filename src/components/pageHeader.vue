<template>
  <div class="common-layout">
    <el-container>
      <el-header class="fixed-header">
        <div class="logo" @click="goToMain">
          <img src="/icons8-plane.png" alt="Logo" class="logo-img" />
          <span class="logo-text">SkyTrack</span>
        </div>

        <div class="nav-container">
          <el-menu
            mode="horizontal"
            router
            class="nav-menu"
            :default-active="activeIndex"
          >
            <el-menu-item index="/departures">Departure Table</el-menu-item>
            <el-menu-item index="/arrivals">Arrival Table</el-menu-item>
            <el-menu-item index="/states">State Table</el-menu-item>
            <el-menu-item index="/map">Map</el-menu-item>
            <el-menu-item
              @mouseover="showLogout = true"
              @mouseleave="showLogout = false"
              ><el-icon><Avatar /></el-icon>
              {{ authStore.user.username }}
              <div
                v-if="showLogout"
                class="logout-dropdown"
                @click="handleLogout"
                style="height: 40px; width: 110px"
              >
                Logout
              </div>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../stores/AuthStore";
import { Avatar } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const showLogout = ref(false);

const handleLogout = () => {
  authStore.logout();
  router.push("/");
};

const goToMain = () => {
  router.push("/states");
};

const activeIndex = computed(() => route.path);
</script>

<style scoped>
.fixed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #07020d;
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  font-family: "Jost", sans-serif;
  z-index: 1;
}

.logo {
  display: flex;
  align-items: center;
}
.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: white;
  font-family: "Jost", sans-serif;
}

.nav-container {
  display: flex;
  align-items: center;
}

.nav-menu {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  min-width: 650px;
}

.el-menu {
  background-color: #07020d;
  flex-wrap: nowrap;
  border-bottom: none !important;
}

.el-menu-item {
  color: white !important;
  transition: color 0.3s ease;
}
.el-menu-item:hover {
  background-color: transparent !important;
  color: #409eff !important;
}

.logout-dropdown {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #07020d;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-dropdown:hover {
  color: #409eff !important;
}
.el-menu-item:focus,
.el-menu-item.is-active {
  background-color: transparent !important;
  color: #409eff !important;
}
.common-layout {
  height: 0vh;
}
</style>
