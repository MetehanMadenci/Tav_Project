<template>
  <div class="login-container">
    <h1>Login Page</h1>
  </div>
  <div class="login">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleFormsss"
      label-width="60px"
    >
      <el-form-item label="Username" prop="username">
        <el-input v-model="ruleForm.username" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input v-model="ruleForm.password" style="width: 300px"></el-input>
      </el-form-item>
      <div class="btn-box">
        <el-button
          type="primary"
          size="medium"
          @click="submitForm"
          style="width: 200px"
          >Giriş</el-button
        >
      </div>
    </el-form>
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
    case "states":
      router.push("/states");
      break;
    default:
      break;
  }
};
</script>
