<template>
  <defaultPage />
</template>
<script setup>
import defaultPage from "./layouts/default.vue";
</script>
<style>
body {
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.error-message {
  background-color: white !important;
  color: #3399ff !important;
  border: 2px solid #3399ff !important;
  border-radius: 8px;
  font-size: 20px;
}
.error-message::before {
  content: "";
  width: 20px;
  height: 20px;
  background-image: url("/icons8-error.png");
}

.error-message .el-message__icon {
  display: none !important;
}
</style>
