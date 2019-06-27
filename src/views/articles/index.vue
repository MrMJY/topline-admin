<!-- 文章组件 -->
<template>
  <div class='app-article'>
    <!-- 筛选 -->
    <el-card class="box-card article-filter">
      <div slot="header"
           class="clearfix">
        <span>筛选条件</span>
      </div>
      <el-form :model="filters"
               label-width="80px">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="filters.status">
            <el-radio label="">全部</el-radio>
            <el-radio v-for="(item, index) in articleType"
                      :key="item.label"
                      :label="index + ''">
              {{item.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <el-select v-model="filters.channel_id"
                     placeholder="请选择频道">
            <el-option value=""
                       label="全部">全部</el-option>
            <el-option v-for="item in channels"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id + ''"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker v-model="start_end_date"
                          type="daterange"
                          value-format="yyyy-MM-dd"
                          @change="handleDate"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="handleFilter"
                     :loading="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表 -->
    <el-card class="box-card article-list">
      <div slot="header"
           class="clearfix">
        <span>共找到<strong> {{ total_count }} </strong>条符合条件的内容</span>
      </div>
      <el-table border
                v-loading="loading"
                :data="articles"
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
                         width="100">
          <template slot-scope="scope">
            <el-tag :type="articleType[scope.row.status].type">
              {{ articleType[scope.row.status].label }}
            </el-tag>
          </template>

        </el-table-column>
        <el-table-column prop="pubdate"
                         align="center"
                         label="发布时间"
                         width="250">
        </el-table-column>
        <el-table-column label="操作"
                         align="center"
                         width="150">
          <template slot-scope="scope">
            <el-button type="success"
                       size="mini"
                       plain>编辑</el-button>
            <el-button type="warning"
                       size="mini"
                       plain
                       @click="handleDelet(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     class="list-page"
                     :disabled="loading"
                     :current-page="page"
                     layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :total="total_count">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'AppArticle',
  data () {
    return {
      total_count: null,
      loading: false,
      page: 1,
      start_end_date: [],
      articles: [],
      articleType: [
        {
          type: 'info',
          label: '草稿'
        },
        {
          type: '',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'warning',
          label: '审核失败'
        },
        {
          type: 'danger',
          label: '已删除'
        }
      ],
      filters: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      },
      filtersData: {},
      channels: []
    };
  },
  created () {
    this.loadArticles();
    this.loadChannels();
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true;
      this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page,
          ...this.filtersData
        }
      }).then(res => {
        console.log(res);
        this.filtersData = {};
        this.total_count = res.total_count;
        this.articles = res.results;
        this.loading = false;
      });
    },
    handleCurrentChange (page) {
      this.page = page;
      this.loadArticles(page);
    },
    handleDelet (item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const articleId = item.id;
        this.$http({
          method: 'DELETE',
          url: `/articles/${articleId}`
        }).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadArticles(this.page);
        });
      });
    },
    loadChannels () {
      this.$http({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.channels;
      });
    },
    handleDate (date) {
      if (this.start_end_date) {
        this.filters.begin_pubdate = this.start_end_date[0];
        this.filters.end_pubdate = this.start_end_date[1];
      } else {
        this.filters.begin_pubdate = '';
        this.filters.end_pubdate = '';
      }
    },
    handleFilter () {
      const params = {};
      for (let key in this.filters) {
        if (this.filters[key]) {
          params[key] = this.filters[key];
        }
      }
      this.filtersData = params;
      this.page = 1;
      this.loadArticles();
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
