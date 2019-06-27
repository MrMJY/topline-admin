<!-- 获取channels列表组件 -->
<template>
  <el-select clearable
             :value="value"
             label="请选择频道"
             placeholder="请选择频道"
             @change="handleChange">
    <el-option v-for="item in channels"
               :key="item.id"
               :label="item.name"
               :value="item.id"></el-option>
  </el-select>
</template>

<script>

export default {
  data () {
    return {
      channels: []
    };
  },
  props: {
    value: {
      type: [Number, String],
      require: true
    }
  },
  created () {
    this.loadChannels();
  },
  methods: {
    loadChannels () {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.channels;
      });
    },
    handleChange (val) {
      this.$emit('input', val);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
