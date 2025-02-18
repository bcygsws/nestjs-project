<!--
*@name: HomeView
*@author: Bao Chengyi
*@date: 2025/2/17 18:25
-->
<template>
  <div class="home-container">
    <div class="card">
      <!--<el-button type="danger" :icon="Delete" circle />-->
      <div class="title">登录</div>
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
      >
        <el-form-item label="账号" prop="user">
          <el-input v-model="ruleForm.user" type="text" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
              v-model="ruleForm.pwd"
              type="password"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="验证" prop="code">
          <div class="code">
            <el-input v-model.number="ruleForm.code" type="text"/>
            <!--点击验证码：验证码就会重置-->
            <img class="show-code" :src="srcUrl" @click="resetCode" alt=""/>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="sub">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              登录
            </el-button>
          </div>
          <a @click="resetForm(ruleFormRef)" class="reset">重置</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus';
import {submitCaptchaAPI} from "@/apis/captcha.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const srcUrl = ref<string>('/api/user/code');
// vite配置文件中，设置了前端跨域
/**
 * @desc:resetCode()方法
 * 重置验证码
 *
 * */
const resetCode = () => {
  srcUrl.value = srcUrl.value + '?' + Math.random() * 100;
}
const ruleFormRef = ref<FormInstance>();


const validateUser = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名！'))
  } else {
    if (ruleForm.user !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value?.validateField('user');
    }
    callback()
  }
}
const validatePwd = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (ruleForm.pwd !== '') {
      ruleFormRef.value?.validateField('pwd');
    }
    callback();
  }
}
// 规则：验证码不为空
const checkCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码！'))
  }
  callback();
}

const ruleForm = reactive({
  user: 'admin',
  pwd: '123456',
  code: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  user: [{validator: validateUser, trigger: 'blur'}],
  pwd: [{validator: validatePwd, trigger: 'blur'}],
  code: [{validator: checkCode, trigger: 'blur'}],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!');
      // 基本校验完成后，提交验证码
      const res: any = await submitCaptchaAPI(ruleForm);
      console.log(res);
      if (res.code === 200) {
        // 跳转至main主页中
        await router.push('/main');
      }
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields();
  Object.assign(ruleForm, {
    user: '',
    pwd: '',
    code: ''
  })
}
</script>

<style lang="scss" scoped>
.home-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);

  .card {
    width: 400px;
    height: 268px;
    position: absolute;
    background-color: #ffffff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px 20px;
    box-sizing: border-box;
    border-radius: 10px;

    .title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
    }

    .code {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      .show-code {
        width: 150px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        margin-left: 20px;
      }

      .el-input {
        flex: 1;
      }
    }

    div.el-form-item__content {
      position: relative;

      .sub {
        width: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
      }

      .reset {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
        color: #409EFF;
      }

    }
  }
}

</style>