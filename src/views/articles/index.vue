<!-- 文章组件 -->
<template>
  <div class='app-article'>
    <!-- 筛选 -->
    <el-card class="box-card article-filter">
      <div slot="header"
           class="clearfix">
        <span>筛选条件</span>
        <el-button style="float: right; padding: 3px 0"
                   type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4"
           :key="o"
           class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
    <!-- 列表 -->
    <el-card class="box-card article-list">
      <div slot="header"
           class="clearfix">
        <span>共找到15条符合条件的内容</span>
        <el-button style="float: right; padding: 3px 0"
                   type="text">操作按钮</el-button>
      </div>
      <el-table :data="articles"
                border
                style="width: 100%">
        <el-table-column prop="date"
                         label="日期"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="address"
                         label="地址">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'AppArticle',
  data () {
    return {
      articles: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  methods: {

  }
};
</script>
<style lang="less" scoped>
.article-filter {
  margin-bottom: 20px;
}
</style>
