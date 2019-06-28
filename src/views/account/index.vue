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
              :span="4"></el-col>
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
    }
  }
};
</script>
<style lang="less" scoped>
</style>
