<!-- 登录组件 -->
<template>
  <div class="login-model">
    <div class="login-form">
      <div class="form-header">
        <img src="./logo_index.png"
             alt="黑马头条" />
      </div>
      <div class="form-body">
        <el-form ref="formData"
                 status-icon
                 :rules="rules"
                 :model="formData">
          <el-form-item prop="mobile">
            <el-input v-model="formData.mobile"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-form-item prop="code">
                <el-input v-model="formData.code"
                          placeholder="验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-button class="btn-code"
                           type="primary"
                           v-text="btn_text"
                           @click="sendCode"
                           :disabled="this.isSendCode">
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item size="mini"
                        prop="agree">
            <el-checkbox v-model="formData.agree"></el-checkbox>
            <span>我已阅读并同意<a href="#">用户协议</a>和<a href="#">隐私条款</a></span>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-login"
                       type="primary"
                       :loading="isLogin"
                       @click="submitLogin">
              登录
            </el-button>
            <div v-if="login_info"
                 class="el-form-item__error login-info">
              用户名或密码错误
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import '@/vender/gt.js';

export default {
  name: 'LoginModel',
  data () {
    return {
      formData: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          {
            required: true,
            len: 11,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { len: 6, message: '验证码必须为6位', trigger: 'blur' }
        ],
        agree: [
          {
            required: true,
            pattern: /true/,
            message: '请同意用户协议',
            trigger: 'change'
          }
        ]
      },
      btn_text: '获取验证码',
      isSendCode: false,
      isLogin: false,
      timer: null,
      captchaObj: null,
      login_info: false,
      init_mobile: ''
    };
  },
  methods: {
    sendCode () {
      this.$refs.formData.validateField('mobile', err => {
        if (!err) {
          // 如果已经存在captchaObj
          if (this.captchaObj) {
            // 如果初始化的号码与发送短信的号码不一致，重新初始化
            if (this.formData.mobile !== this.init_mobile) {
              document.body.removeChild(
                document.querySelector('.geetest_panel')
              );
              return this.code();
            }
            this.captchaObj.verify();
          } else {
            this.code();
          }
        }
      });
    },
    submitLogin () {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    login () {
      this.isLogin = true;
      this.$http({
        method: 'POST',
        url: '/authorizations',
        data: this.formData
      })
        .then(res => {
          this.isLogin = false;
          this.login_info = false;
          window.localStorage.setItem('user-info', JSON.stringify(res.data.data));
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success',
            centern: true
          });
          this.$router.push('/');
        })
        .catch(err => {
          this.isLogin = false;
          this.login_info = true;
          console.log(err);
        });
    },
    code () {
      this.isSendCode = true;
      this.init_mobile = this.formData.mobile;
      this.$http({
        method: 'GET',
        url: `/captchas/${
          this.formData.mobile
        }`
      }).then(res => {
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
              .onReady(() => {
                // 验证码ready之后才能调用verify方法显示验证码
                this.isSendCode = false;
                captchaObj.verify();
              })
              .onSuccess(() => {
                this.captchaObj = null;
                let {
                  geetest_challenge: challenge,
                  geetest_validate: validate,
                  geetest_seccode: seccode
                } = captchaObj.getValidate();
                let secondCount = 60;
                this.isSendCode = true;
                this.btn_text = secondCount + 's后可重新发送';
                this.$http({
                  method: 'GET',
                  url: `/sms/codes/${
                    this.formData.mobile
                  }`,
                  params: {
                    challenge,
                    validate,
                    seccode
                  }
                });
                this.timer = setInterval(() => {
                  if (secondCount === 1) {
                    secondCount = 60;
                    this.isSendCode = false;
                    this.btn_text = '获取验证码';
                    clearInterval(this.timer);
                    return;
                  }
                  secondCount--;
                  this.btn_text = secondCount + 's后可重新发送';
                }, 1000);
              });
          }
        );
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
    .btn-code {
      width: 112px;
      padding: 12px 0;
    }
    .btn-login {
      width: 100%;
    }
    .login-info {
      width: 100%;
      top: 110%;
      text-align: center;
    }
    .el-checkbox {
      margin-right: 10px;
    }
  }
}
</style>
