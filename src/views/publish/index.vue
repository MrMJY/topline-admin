<!-- 发布组件 -->
<template>
  <el-card>
    <div class="f14"
         slot="header">
      <span>发表文章</span>
    </div>
    <el-form label-width="40px">
      <el-form-item size="small"
                    label="标题">
        <el-input v-model="publishData.title"></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="内容">
        <el-input v-model="publishData.content"></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="封面">
        <el-input></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="频道">
        <channels v-model="publishData.channel_id"></channels>
      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click.native="handlePublish(false)">发布</el-button>
        <el-button type="primary"
                   @click.native="handlePublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import Channels from '@/components/channels';
export default {
  name: 'Publish',
  components: {
    Channels
  },
  data () {
    return {
      publishData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      }
    };
  },
  methods: {
    handlePublish (draft) {
      this.$http({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.publishData
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发布成功'
        });
      }).catch(err => {
        console.log(err);
        this.$message.error('发布失败');
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-form {
  width: 40%;
}
</style>
