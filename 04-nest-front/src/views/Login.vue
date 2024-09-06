<!--
*@name: Login
*@author: Bao Chengyi
*@date: 2024/8/22 18:18
-->
<template>
  <div class="login-container">
    <el-card style="width: 400px;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)">
      <div class="title">登录</div>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          label-position="left"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="验证码" prop="checkPass">
          <div class="code">
            <el-input type="text" v-model="ruleForm.checkPass"/>
            <!--给src传入接口地址，页面渲染时，会自动发送一次资源请求-->
            <img :src="codeUrl" width="100" alt="" @click="resetCode"/>

          </div>
        </el-form-item>

        <el-form-item>
          <div class="submit">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {ElMessage} from "element-plus";
import {submitLoginAPI} from "@/apis/login.ts";
import {useRouter} from 'vue-router';
import useTokenStore from "@/store";

const router = useRouter();
const tokenStore = useTokenStore();

const ruleFormRef = ref<FormInstance>();
// 设置验证码图片的请求路径
const codeUrl = ref<string>("/api/captcha");
// 点击图片，重新生成一个验证码
const resetCode = () => {
  // 更改一下图片的请求路径即可
  codeUrl.value = codeUrl.value + '?' + Math.random();

}

// const checkAdmin = (rule: any, value: string, callback: any) => {
// 使用下划线 _ 代替 rule，注释掉未被使用的变量
const checkAdmin = (_: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('账号为空，请先输入账号'));// 账号框为空时，给出提示
  }
  // 约定账号长度在5到16个字符之间
  if (value.length > 4 && value.length < 17) {
    callback();
  } else {
    callback(new Error('账号的长度在5至16个字符之间'));
  }
}

const validatePwd = (_: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('密码为空，请先输入密码'));// 密码框为空时，给出提示
  }
  // 约定密码长度在5到16个字符之间
  if (value.length > 4 && value.length < 17) {
    callback();
  } else {
    callback(new Error('密码的长度在5至16个字符之间'));
  }
}
const validateCode = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.length !== 4) {
    callback(new Error("验证码应为4个字符"));
  } else {
    callback();
  }
}

const ruleForm = reactive({
  username: 'admin',
  password: '123456',
  checkPass: ''
})

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{validator: checkAdmin, trigger: 'blur'}],
  password: [{validator: validatePwd, trigger: 'blur'}],
  checkPass: [{validator: validateCode, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {// 验证成功后，表单数据收集后，提交至后端验证
      console.log('submit!');
      // 1.点击 登录 按钮，收集到了登录信息
      console.log(ruleForm);
      // 2.登录信息提交至后端,此处直接传入ruleForm,不需要单个拼接变成普通对象
      const res = await submitLoginAPI(ruleForm);
      console.log(res);
      console.log(res.data['access_token']);
      if (res.data.code === 200) {
        // 1.登录成功提示
        ElMessage({
          type: 'success',
          message: res.data.message
        });
        // 2.存储token
        tokenStore.saveAccessToken(res.data['access_token']);
        tokenStore.saveRefreshToken(res.data['refresh_token']);

        // 4.登录成功，导航到 /home主面板
        await router.push('/home');


      } else {
        ElMessage({
          type: 'error',
          message: res.data.message
        });
        // 2.表单域重置
        formEl.resetFields();
        // 3.验证码写重新生成
        codeUrl.value += '?' + Date.now();

      }
    } else {
      // 1.验证错误时
      ElMessage({
        type: 'error',
        message: '登录失败，请输入正确的账号信息'
      });
      // 2.重置表单域
      formEl.resetFields();
      // 3.验证码重新生成
      codeUrl.value += '?' + Date.now();
    }
  })
}
</script>

<style lang="scss" scoped>
.login-container {
  .title {
    text-align: center;
    font-size: 20px;
    padding-bottom: 20px;
  }

  /*验证码栏样式*/
  .code {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    > .el-input {
      width: 245px;
    }

    > img {
      margin-left: 15px;
    }

  }

  .submit {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

</style>