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
        <el-input></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="内容">
        <el-input></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="封面">
        <el-input></el-input>
      </el-form-item>
      <el-form-item size="small"
                    label="频道">
        <channels v-model="channels_id"></channels>
      </el-form-item>
      <el-form-item>
        <el-button type="success">发布</el-button>
        <el-button type="primary">存入草稿</el-button>
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
      channels_id: ''
    };
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
.el-form {
  width: 40%;
}
</style>
