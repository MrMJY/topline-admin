<!-- 登录组件 -->
<template>
  <div class="login-model">
    <div class="login-form">
      <div class="form-header">
        <img src="./logo_index.png" alt="黑马头条" />
      </div>
      <div class="form-body">
        <el-form ref="form" :model="formData">
          <el-form-item>
            <el-input v-model="formData.mobole" placeholder="手机号"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-form-item>
                <el-input
                  v-model="formData.code"
                  placeholder="验证码"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-button type="primary" @click="sendCode"
                  >获取验证码</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button class="btn-login" type="primary" @click="submitLogin"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModel',
  data () {
    return {
      formData: {
        mobile: '',
        code: ''
      }
    };
  },
  methods: {
    sendCode () {
      console.log('submit!');
    },
    submitLogin () {
      console.log('login');
    }
  }
};
</script>
<style lang="less" scoped>
.login-model {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(./login_bg.jpg) no-repeat center;
  .form-header {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 60%;
      margin-bottom: 20px;
    }
  }
  .login-form {
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
    .btn-login {
      width: 100%;
    }
  }
}
</style>
