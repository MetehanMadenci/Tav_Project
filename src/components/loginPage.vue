<template>
    <div class="login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormsss" label-width="60px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="ruleForm.username" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="ruleForm.password" style="width: 300px"></el-input>
        </el-form-item>
        <div class="btn-box">
          <el-button type="primary" size="medium" @click="submitForm" style="width: 200px">Giriş</el-button>
        </div>
      </el-form>
    </div>
  </template>
  <script lang="ts">
  import { useRouter } from 'vue-router';
  import {
    getCurrentInstance,
    reactive,
    ref
  } from 'vue'
  interface ModelRef {
    username: string;
    password: string;
  }
  export default {
    setup() {
      const router = useRouter();
      const { ctx }: any = getCurrentInstance();
      const ruleFormsss = ref<any>(null);
      const ruleForm: ModelRef = reactive<ModelRef>({
        username: '',
        password: '',
      })
      const rules = {
        username: [
          { required: true, message: 'Lütfen username giriniz.', trigger: 'blur' },
          { min: 5, max: 20, message: 'Username 5 haneden az olamaz !', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Lütfen parolanızı giriniz', trigger: 'blur' },
          { min: 6, max: 20, message: 'Parola 6 haneden az olamaz !', trigger: 'blur' }
        ]
      }
      const submitForm = () => {
        try {
          (ruleFormsss.value as any).validate((valid: boolean) => {
            if (valid) {
              console.log(ruleForm)
              const { username, password } = ruleForm
              if (username == 'admin' && password == '123456') {
                ctx.$message.success('Giriş Başarılı');
                router.push('home')
              } else {
                ctx.$message.error('Username veya Şifre Hatalı !');
              }
            }
          });
        } catch (error){
          console.log(error);
        }
      }
      return {
        ruleForm,
        rules,
        submitForm,
        ruleFormsss
      }
    },
  };
  </script>