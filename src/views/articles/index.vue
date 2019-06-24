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
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="form.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="form.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker v-model="value1"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
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
                class="list-table"
                style="width: 100%">
        <el-table-column label="封面"
                         align="center"
                         width="80">
          <template slot-scope="scope">
            <img width="70"
                 :src="scope.row.cover.images[0]" />
          </template>
        </el-table-column>
        <el-table-column prop="title"
                         align="center"
                         label="标题"
                         width="300">
        </el-table-column>
        <el-table-column prop="status"
                         align="center"
                         label="状态"
                         width="60">
        </el-table-column>
        <el-table-column prop="pubdate"
                         align="center"
                         label="发布时间"
                         width="250">
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="150">
          <el-button type="success"
                     size="mini"
                     plain>编辑</el-button>
          <el-button type="warning"
                     size="mini"
                     plain>删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination background
                     class="list-page"
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'AppArticle',
  data () {
    return {
      articles: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      value1: ''
    };
  },
  created () {
    this.loadArticles();
  },
  methods: {
    loadArticles () {
      this.$http({
        method: 'GET',
        url: '/articles'
      }).then(res => {
        console.log(res);
        this.articles = res.results;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.article-filter {
  margin-bottom: 20px;
}
.list-table .ceil {
  text-align: center;
}
.list-page {
  margin-top: 20px;
  text-align: center;
}
</style>
