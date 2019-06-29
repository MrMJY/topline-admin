<!-- AppHeader -->
<template>
  <el-row class="app-header">
    <el-col :span="14">江苏传智播客教育科技股份有限公司</el-col>
    <el-col :span="4"
            :offset="6">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img width="30"
               :src="$store.state.user.photo">
          {{ $store.state.user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="handleAccount">账户设置</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  methods: {
    handleLogout () {
      this.$confirm('您确定要退出此账户吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-info');
        this.$router.push({
          name: 'login'
        });
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },

    handleAccount () {
      this.$router.push({ name: 'Account' });
    }
  }
};
</script>
<style lang="less" scoped>
.app-header {
  height: 60px;
  display: flex;
  width: 100%;
  align-items: center;
  .el-col-14 {
    font-size: 14px;
  }
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #409eff;
  img {
    border-radius: 50%;
    margin-right: 5px;
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
