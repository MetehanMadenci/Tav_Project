<template>
  <defaultPage />
</template>
<script setup>
import axios from "axios";
import dayjs from "dayjs";
import planeTable from "./components/planeTable.vue";
import loginPage from "./components/loginPage.vue";
import defaultPage from "./layouts/default.vue";
</script>
<style>
body {
  background-image: url("./assets/cloud-background.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
