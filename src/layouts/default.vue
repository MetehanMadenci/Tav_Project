<template>
  <el-container class="layout-container">
    <PageHeader class="header" />
    <el-main class="content">
      <router-view />
    </el-main>
    <PageFooter class="footer" />
  </el-container>
</template>

<script setup>
import PageHeader from "../components/pageHeader.vue";
import PageFooter from "../components/pageFooter.vue";
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.header {
  flex: 0 0 auto;
}

.footer {
  flex: 0 0 auto;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}
</style>
