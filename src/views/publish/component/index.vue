<!-- 封面组件 -->
<template>
  <div class='overlist'>
    <div class="avatar"
         @click="handleUpload">
      <img v-if="value"
           :src="value">
      <i v-else
         class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <el-dialog title="提交素材"
               :visible.sync="dialogVisible"
               width="30%">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="上传图片"
                     name="first">
          <el-upload class="avatar"
                     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
                     :headers="{Authorization: `Bearer ${$store.state.user.token}`}"
                     name="image"
                     :show-file-list="false"
                     :on-success="handleSuccess">
            <img v-if="imageUrl"
                 :src="imageUrl">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="素材库"
                     name="second">素材库</el-tab-pane>
      </el-tabs>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'CoverList',
  data () {
    return {
      imageUrl: null,
      dialogVisible: false,
      activeName: 'first'
    };
  },

  props: ['value'],

  methods: {
    handleUpload () {
      this.dialogVisible = true;
    },

    handleClick () { },

    handleSuccess (res) {
      this.imageUrl = res.data.url;
    },

    dialogOK () {
      this.$emit('input', this.imageUrl);
      this.dialogVisible = false;
      this.$message({
        type: 'success',
        message: '上传成功'
      });
    }
  }
};
</script>
<style lang="less" scoped>
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
  display: block;
  img {
    width: 100%;
  }
}
.avatar:hover {
  border-color: #409eff;
}
</style>
