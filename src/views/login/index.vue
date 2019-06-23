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
            <el-input v-model="formData.mobile" placeholder="手机号"></el-input>
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
import '@/vender/gt.js';
import axios from 'axios';

export default {
  name: 'LoginModel',
  data () {
    return {
      formData: {
        mobile: '17866637565',
        code: ''
      },
      captchaObj: null
    };
  },
  methods: {
    sendCode () {
      console.log('submit!');
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${
          this.formData.mobile
        }`
      }).then(res => {
        if (this.captchaObj) {
          return this.captchaObj.verify();
        }
        // 请检测data的数据结构， 保证data.gt, data.challenge, data.success有值
        let { gt, challenge, success } = res.data.data;
        window.initGeetest(
          {
            // 以下配置参数来自服务端 SDK
            gt,
            challenge,
            offline: !success,
            new_captcha: true,
            product: 'bind'
          },
          captchaObj => {
            // 这里可以调用验证实例 captchaObj 的实例方法
            this.captchaObj = captchaObj;
            captchaObj
              .onReady(function () {
                // 验证码ready之后才能调用verify方法显示验证码
                captchaObj.verify();
              })
              .onSuccess(() => {
                this.captchaObj = null;
                let {
                  geetest_challenge: challenge,
                  geetest_validate: validate,
                  geetest_seccode: seccode
                } = captchaObj.getValidate();
                axios({
                  method: 'GET',
                  url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${
                    this.formData.mobile
                  }`,
                  params: {
                    challenge,
                    validate,
                    seccode
                  }
                }).then(res => {
                  console.log(res);
                });
              })
              .onError(function () {});
          }
        );
      });
    },
    submitLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.formData
      }).then(res => {
        this.$router.push({
          name: 'home'
        });
      });
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
