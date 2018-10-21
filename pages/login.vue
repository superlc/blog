<template>
    <section class="container">
        <el-form 
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            label-width="100px"
            class="demo-ruleForm"
            status-icon>
            <el-form-item 
                label="账户" 
                prop="account">
                <el-input
                    v-model="loginForm.account"
                    type="text"
                    autocomplete="off" />
            </el-form-item>
            <el-form-item 
                label="密码"
                prop="password">
                <el-input
                    v-model="loginForm.password" 
                    type="password"
                    autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary"
                    @click="submit">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
    export default {
      components: {},
      data() {
        return {
          loginForm: {
            account: "",
            password: ""
          },
          loginRules: {}
        };
      },
      methods: {
        login() {}
      }
    };
</script>

<style>
</style>
