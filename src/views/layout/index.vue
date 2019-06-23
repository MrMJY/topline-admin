<!-- layout组件 -->
<template>
  <el-container>
    <el-aside width="200px">
      <app-aside></app-aside>
    </el-aside>
    <el-container>
      <el-header>
        <app-header></app-header>
        <el-row></el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from '@/views/layout/appheader';
import AppAside from '@/views/layout/appaside';

export default {
  data () {
    return {};
  },
  components: {
    AppHeader,
    AppAside
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: rgb(84, 92, 100);
    .el-menu {
      border: 0;
    }
  }
  .el-header {
    background-color: #aec0d1;
  }
  .el-main {
    background-color: #ddd;
  }
}
</style>
