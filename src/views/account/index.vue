/* eslint-disable vue/valid-v-model */
<!-- 用户设置组件 -->
<template>
  <el-card>
    <div class="f14"
         slot="header">
      账号信息
    </div>
    <el-row>
      <el-col :span="10">
        <el-form v-loading="loading"
                 label-width="80px">
          <el-form-item label="用户名称">
            <el-input size="small"
                      v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="账号信息">
            <el-input size="small"
                      v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="账号ID">
            <el-input size="small"
                      disabled
                      :value="userInfo.id + ''"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input size="small"
                      disabled
                      :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input size="small"
                      type="email"
                      v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       :loading="loading"
                       @click="handleSave">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2"
              :span="4">
        <el-upload class="avatar-uploader"
                   action=""
                   :http-request="handleUpload">
          <img v-if="userInfo.photo"
               :src="userInfo.photo"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'Account',
  data () {
    return {
      userInfo: {},
      loading: true
    };
  },
  created () {
    this.loadUserInfo();
  },
  methods: {
    loadUserInfo () {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.userInfo = res;
        this.loading = false;
      });
    },

    handleSave () {
      this.loading = true;
      this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: this.userInfo
      }).then(res => {
        this.refreshUserInfo(res);
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message.error('保存失败');
        this.loading = false;
      });
    },

    handleUpload (uploadConfig) {
      const formData = new FormData();
      formData.append('photo', uploadConfig.file);
      this.$http({
        method: 'PATCH',
        url: '/user/photo',
        data: formData
      }).then((res) => {
        this.userInfo.photo = res.photo;
        this.refreshUserInfo(res, 'photo');
        this.$message({
          type: 'success',
          message: '上传成功'
        });
      }).catch(err => {
        console.log(err);
        this.$message.error('上传失败');
      });
    },

    refreshUserInfo (res, config = 'all') {
      const localUserInfo = JSON.parse(window.localStorage.getItem('user-info'));
      if (config === 'all') {
        for (let key in res) {
          localUserInfo[key] = res[key];
        }
        window.localStorage.setItem('user-info', JSON.stringify(localUserInfo));
      } else {
        localUserInfo[config] = res[config];
        window.localStorage.setItem('user-info', JSON.stringify(localUserInfo));
      }
      this.$EventBus.$emit('userinfo');
    }
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px !important;
  cursor: pointer;
  position: relative;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
