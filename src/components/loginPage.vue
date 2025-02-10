<template>
  <div>
    <div style="margin-top: 20px; display: flex; gap: 10px">
      <el-button type="primary" @click="navigateTo('arrivals')"
        >Arrivals</el-button
      >
      <el-button type="primary" @click="navigateTo('departures')"
        >Departures</el-button
      >
      <el-button type="primary" @click="navigateTo('map')">Map</el-button>
      <el-button type="primary" @click="navigateTo('states')">States</el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (page) => {
  switch (page) {
    case "arrivals":
      router.push("/arrivals");
      break;
    case "departures":
      router.push("/departures");
      break;
    case "map":
      router.push("/map");
      break;
    case "states":
      router.push("/states");
      break;
    default:
      break;
  }
};
</script>
