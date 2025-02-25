<template>
  <body>
    <router-view />
  </body>
</template>
<script setup></script>
<style>
html,
body {
  margin: 0;
  height: 100vh;
}
.error-message,
.data-error-message {
  background-color: white !important;
  border-radius: 8px;
  font-size: 20px;
  top: 70px !important;
  right: -110px !important;
  left: auto !important;
  z-index: 11 !important;
}

.error-message {
  color: #3399ff !important;
  border: 2px solid #3399ff !important;
}

.data-error-message {
  padding-top: 5%;
  color: #ff1500 !important;
  border: 2px solid #ff1500 !important;
}

.data-error-message::before,
.error-message::before {
  content: "";
  width: 20px;
  height: 20px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 10px;
}

.data-error-message::before {
  background-image: url("/red-icons8-error.png");
}

.error-message::before {
  background-image: url("/icons8-error.png");
}

.error-message .el-message__icon,
.data-error-message .el-message__icon {
  display: none !important;
}
</style>
