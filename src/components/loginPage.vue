<template>
  <PageHeader />
  <div class="container">
    <div class="content">Login Page</div>
  </div>
  <PageFooter />
</template>

<script setup>
import PageHeader from "./pageHeader.vue";
import PageFooter from "./pageFooter.vue";
</script>
<style>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}
</style>
