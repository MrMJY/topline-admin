<!-- 侧边栏组件 -->
<template>
  <el-menu default-active="2"
           router
           @open="handleOpen"
           @close="handleClose"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <el-menu-item index="/">
      <template slot="title">
        <i class="iconfont iconhome f24"
           style="margin-right:1px"></i>
        <span slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="/article">
      <template slot="title">
        <i class="iconfont iconcontent f18"
           style="margin-right: 3px;margin-left: 4px;"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/publish">
          <i class="iconfont iconeditorpublish f18"
             style="margin-right:3px"></i>
          <span>发布</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="iconfont iconicon-articles f16"
             style="margin-left:1px;margin-right:4px"></i>
          <span>内容列表</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="iconfont iconsymbols f14"
             style="margin-left:3px;margin-right:5px"></i>
          <span>评论列表</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="iconfont iconsucai f16 mr"
             style="margin:0 3px"></i>
          <span>素材管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="/fans">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>粉丝管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="3-1">
          <i class="iconfont"></i>
          <span>图文数据</span>
        </el-menu-item>
        <el-menu-item index="/fans/overview">
          <i class="iconfont"></i>
          <span>粉丝概况</span>
        </el-menu-item>
        <el-menu-item index="/fans/portrayal">
          <i class="iconfont"></i>
          <span>粉丝画像</span>
        </el-menu-item>
        <el-menu-item index="/fans/list">
          <i class="iconfont"></i>
          <span>粉丝列表</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/account">
      <i class="iconfont iconicon_account f18"
         style="margin:0 5px"></i>
      <span slot="title">账户设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data () {
    return {};
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
