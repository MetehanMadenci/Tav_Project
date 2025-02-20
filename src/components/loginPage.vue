<template>
  <div class="app-container">
    <div class="logo-container">
      <img src="/icons8-plane.png" alt="Plane Icon" class="plane-icon" />
      <h1 class="logo-text">SkyTrack</h1>
    </div>
    <div class="login-container">
      <h1>Login</h1>
      <input required v-model="username" placeholder="Username" class="input" />
      <hr />
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
      />
      <hr />
      <button @click="handleLogin" class="login-button">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  if (!username.value || !password.value) {
    ElMessage({
      message: "Username or Password are required!",
      duration: 3000,
      showClose: true,
      customClass: "error-message",
    });
    return;
  }
  await authStore.login(username.value, password.value);
  if (authStore.isAuthenticated) {
    router.push("/map");
  }
};
</script>

<style>
.app-container {
  background-color: #07020d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.plane-icon {
  width: 50px;
  height: 50px;
}

.logo-text {
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin: 0;
  font-family: "Jost", sans-serif;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 220px;
  width: 250px;
  font-family: "Jost", sans-serif;
  border: 1px solid #3399ff;
  border-radius: 8px;
  text-align: center;
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.input {
  font-family: "Jost", sans-serif;
  border: 1px solid #3399ff;
  border-radius: 4px;
  width: 200px;
  padding: 5px;
}

.login-button {
  font-family: "Jost", sans-serif;
  background-color: #3399ff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  width: 210px;
  padding: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.login-button:hover {
  background-color: #2675d8;
}
</style>
