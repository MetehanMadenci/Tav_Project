<template>
  <el-page-header @back="goBack" :icon="ArrowLeft">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style="padding-left: 10px" :to="{ path: '/' }"
          >Homepage</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <template #content>
      <div class="header-container">
        <div class="appname">SkyTrack</div>
        <span
          class="nav-item tables-item"
          :class="{ active: route.name === 'Map' }"
          @click="navigateTo('/map')"
        >
          Map
        </span>

        <el-dropdown>
          <span class="nav-item tables-item" :class="{ active: isTablePage }">
            Tables ⏷
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="navigateTo('/arrivals')"
                :class="{
                  active: route.name === 'Arrivals',
                  'highlight-bg': route.name === 'Arrivals',
                }"
              >
                Arrival Table
              </el-dropdown-item>
              <el-dropdown-item
                @click="navigateTo('/departures')"
                :class="{
                  active: route.name === 'Departures',
                  'highlight-bg': route.name === 'Departures',
                }"
              >
                Departure Table
              </el-dropdown-item>
              <el-dropdown-item
                @click="navigateTo('/states')"
                :class="{
                  active: route.name === 'States',
                  'highlight-bg': route.name === 'States',
                }"
              >
                State Table
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </template>
  </el-page-header>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";

const router = useRouter();
const route = useRoute();

const pageTitle = computed(() => {
  const routeName = route.name;
  const titles = {
    Arrivals: "Arrival Table",
    Departures: "Departure Table",
    States: "State Table",
    Map: "Map",
  };
  return titles[routeName];
});

const isTablePage = computed(() =>
  ["Arrivals", "Departures", "States"].includes(route.name)
);

const navigateTo = (path) => {
  router.push(path);
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.appname {
  font-size: 35px;
  color: #4b74a1;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-image: url("../assets/indir.png");
  background-size: 60px 28px;
  background-repeat: no-repeat;
  background-position: left center;
  padding-left: 80px;
}

.header-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-item {
  font-size: 22px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 15px;
}

.tables-item {
  color: #007bff;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 23px;
  font-weight: bold;
}

.tables-item:hover,
.active {
  color: #04376d;
  font-size: 25px;
}

.highlight-bg {
  background-color: #d1e7fd !important;
  font-weight: bold;
  border-radius: 5px;
}

.el-page-header {
  color: #3399ff;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-bottom: 15px;
  padding: 10px 0;
  transition: background 0.3s;
  background-color: white;
  border: 1px solid #3399ff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
